const { getInvoiceId } = require("../../helpers/services");
const {
  sampleAutoParts
} = require("../../helpers/test-data");
const Product = require("../../models/product.model");
const SKUChunk = require("../../models/sku-chunk.model");
const SKU = require("../../models/sku.model");
const Transactions = require("../../models/transaction.model");
const User = require("../../models/user.model");
const createToken = require("../../utils/createToken");
const ErrorCodes = require("../../utils/ErrorCodes");

const chunkOptions = {
  prefixes: ["ENG", "BRK", "OIL", "FLT", "RAD", "ALT", "TRN", "SUS", "EXH", "ELEC"],
  mids: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  suffixes: ["A", "B", "C", "X", "Z"]
};

async function generateSKUChunks() {
  const chunks = [];
  const orders = [0, 1, 2];
  for (let i = 0; i < 10; i++) {
    const prefix = chunkOptions.prefixes[Math.floor(Math.random() * chunkOptions.prefixes.length)];
    const mid = chunkOptions.mids[Math.floor(Math.random() * chunkOptions.mids.length)];
    const suffix = chunkOptions.suffixes[Math.floor(Math.random() * chunkOptions.suffixes.length)];

    // Create 2–3 chunks
    const chunkDocs = await Promise.all([
      SKUChunk.create({
        order: 0,
        chunk: prefix
      }),
      SKUChunk.create({
        order: 1,
        chunk: mid
      }),
      ...(Math.random() > 0.5 ? [SKUChunk.create({
        order: 2,
        chunk: suffix
      })] : [])
    ]);

    chunks.push(chunkDocs);
  }

  return chunks;
}

async function createSKUsWithChunks(chunkSets) {
  const skuDocs = [];

  for (const chunkSet of chunkSets) {
    const sku = await SKU.create({
      skuChunks: chunkSet.map((c) => c._id),
    });

    skuDocs.push(sku);
  }

  return skuDocs;
}

async function createProductsWithSKUs(skuDocs) {
  for (let i = 0; i < 10; i++) {
    const product = sampleAutoParts[i];
    await Product.create({
      ...product,
      sku: skuDocs[i]._id,
    });
  }
}

async function seed() {
  try {
    console.log("🧹 Seeding...");
    const transactions = await Transactions.find({
      invoiceId: { $exists: false },
    });

    for (const tx of transactions) {
      const invoiceId = await getInvoiceId(tx._id);
      tx.invoiceId = invoiceId;
      await tx.save();
      console.log(`Assigned ${invoiceId} to transaction ${tx._id}`);
    }
    console.log("✅ Seed completed!");
    // process.exit(0);
  } catch (err) {
    console.error(err);
    // process.exit(1);
  }
}

const initializeSetup = async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.signup('jbl_admin', 'Password1.', 'admin');
    const token = createToken(user._id);
    return res.json({
      status: "Setup Success",
      token,
      data: {
        username: user.username,
        id: user._id,
      },
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
};

const checkSetup = async (req, res) => {
  try {
    const admin = await User.findOneAndUpdate({
      role: 'admin'
    }, {
      username: 'jbl_admin'
    });
    return res.json({
      status: "Done",
      initialized: true
    });
  } catch (error) {
    return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error.message,
    });
  }
}

const adminCheck = (req, res) => {
  return res.json({
    validated: true
  });

}

const runSeed = async (req, res) => {
  seed()
  return res.json({
    status: "Complete",
  });
}


module.exports = {
  initializeSetup,
  checkSetup,
  runSeed,
  adminCheck,
};