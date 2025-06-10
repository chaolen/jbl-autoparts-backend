const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const skusRouter = require("./routes/skusRouter");
const transactionsRouter = require("./routes/transactionsRouter");
const setupRouter = require("./routes/setupRouter");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(
  // @ts-ignore
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// { credentials: true, origin: "http://192.168.100.117" }
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
// app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/skus", skusRouter);
app.use("/api/v1/transactions", transactionsRouter);

app.use('/initialize', setupRouter)
app.use('/uploads', express.static('uploads'));

app.all("*", (req, res, next) => {
  next(
    new AppError(`this route ${req.originalUrl} doesn't exist on server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
