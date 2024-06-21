const express = require("express");
require("dotenv").config();
const connectToMongo = require("./config/database");
const router = require("./routes/transactionsRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use("/api", router);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
