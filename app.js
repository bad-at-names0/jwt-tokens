require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//middleware
app.use(express.json());

//db imports
const connectDB = require("./db/connect");

//routers
const jobsRouter = require("./routers/jobs");
const authRouter = require("./routers/user");

//middlewares
const authMiddleware = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

//connect to DB and start server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
