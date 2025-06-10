const SKUChunk = require("../../models/sku-chunk.model");
const SKU = require("../../models/sku.model");
const ErrorCodes = require("../../utils/ErrorCodes");

const getSKUs = async (req, res) => {
  try {
    const skus = await SKU.find().populate({
      path: "skuChunks",
      options: {
        sort: { order: 1 }
      }
    })
    .sort({ createdAt: -1 })
    .lean();

    const formattedSKUs = skus.map(sku => {
      const chunks = sku.skuChunks || [];
      // @ts-ignore
      const skuString = chunks.map(chunk => chunk.chunk).join("-");
      return {
        _id: sku._id,
        sku: skuString,
        createdAt: sku.createdAt,
        updatedAt: sku.updatedAt
      };
    });

    return res.status(200).json({
      status: "success",
      data: { skus: formattedSKUs }
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
};

const bulkCreateSKUs = async (req, res) => {
  try {
    const { skus } = req.body; // Array of SKU strings, e.g., ["A-B-C", "X-Y-Z"]

    if (!Array.isArray(skus) || skus.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide an array of SKUs.",
      });
    }

    const createdSKUs = [];

    for (const sku of skus) {
      const skuParts = sku.split("-");

      const chunkDocs = await Promise.all(
        skuParts.map(async (part, index) => {
          let chunk = await SKUChunk.findOne({ chunk: part, order: index });

          if (!chunk) {
            chunk = await SKUChunk.create({ chunk: part, order: index });
          }

          return chunk;
        })
      );

      const chunkIds = chunkDocs.map((c) => c._id.toString());

      let matchingSKU = await SKU.findOne({
        skuChunks: { $size: chunkIds.length, $all: chunkIds },
      });

      if (!matchingSKU) {
        matchingSKU = await SKU.create({ skuChunks: chunkIds });
      }

      createdSKUs.push(matchingSKU);
    }

    return res.status(201).json({
      status: "success",
      data: { skus: createdSKUs },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};


const createSKU = async (req, res) => {
  try {
    const { sku } = req.body;

    const skuParts = sku.split("-");

    const chunkDocs = await Promise.all(
      skuParts.map(async (part, index) => {
        let chunk = await SKUChunk.findOne({ chunk: part, order: index });

        if (!chunk) {
          chunk = await SKUChunk.create({ chunk: part, order: index });
        }

        return chunk;
      })
    );

    const chunkIds = chunkDocs.map(c => c._id.toString());

    let matchingSKU = await SKU.findOne({
      skuChunks: { $size: chunkIds.length, $all: chunkIds },
    });

    if (!matchingSKU) {
      matchingSKU = await SKU.create({ skuChunks: chunkIds });
    }

    return res.status(201).json({
      status: "success",
      data: { sku: matchingSKU }
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateSKU = async (req, res) => {
  try {
    const { skuId } = req.params;
    const { sku } = req.body;

    const skuParts = sku.split("-");

    const chunkDocs = await Promise.all(
      skuParts.map(async (part, index) => {
        let chunk = await SKUChunk.findOne({ chunk: part, order: index });
        if (!chunk) {
          chunk = await SKUChunk.create({ chunk: part, order: index });
        }
        return chunk;
      })
    );

    const chunkIds = chunkDocs.map(c => c._id.toString());

    const updatedSKU = await SKU.findByIdAndUpdate(
      skuId,
      { skuChunks: chunkIds },
      { new: true, runValidators: true }
    );

    if (!updatedSKU) {
      return res.status(404).json({
        status: "failed",
        message: "SKU not found."
      });
    }

    return res.status(200).json({
      status: "success",
      data: { sku: updatedSKU }
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteSKU = async (req, res) => {
  try {
    const { skuId } = req.params;

    const deletedSKU = await SKU.findByIdAndDelete(skuId);

    if (!deletedSKU) {
      return res.status(404).json({
        status: "failed",
        message: "SKU not found."
      });
    }

    return res.status(200).json({
      status: "success",
      message: "SKU deleted successfully."
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
};

const checkSKU = async (req, res) => {
  try {
    const { sku } = req.params;

    if (!sku) {
      return res.status(400).json({
        status: "failed",
        message: "SKU is required",
      });
    }

    const skuParts = sku.split("-");

    // Find chunk docs for each part
    const chunkDocs = await Promise.all(
      skuParts.map((part, index) =>
        SKUChunk.findOne({ chunk: part, order: index })
      )
    );

    // If any chunk doesn't exist, the SKU definitely doesn't exist
    if (chunkDocs.some((chunk) => !chunk)) {
      return res.status(200).json({
        status: "success",
        exists: false,
      });
    }

    const chunkIds = chunkDocs.map((c) => c._id.toString());

    const matchingSKU = await SKU.findOne({
      skuChunks: { $size: chunkIds.length, $all: chunkIds },
    });

    return res.status(200).json({
      status: "success",
      exists: !!matchingSKU,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getChunkByOrder = async (req, res) => {
  const { order } = req.params;
  const skuChunksByOrder = await SKUChunk.find({ order }).select('chunk _id');

  return res.status(200).json({
    status: "success",
    data: skuChunksByOrder
  });
};

module.exports = {
  getSKUs,
  createSKU,
  updateSKU,
  deleteSKU,
  getChunkByOrder,
  bulkCreateSKUs,
  checkSKU,
};
