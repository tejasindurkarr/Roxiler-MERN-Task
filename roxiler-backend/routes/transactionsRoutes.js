const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

// API to initialize the database with seed data
router.get("/initialize-database", transactionsController.initializeDatabase);

// API to list all transactions with search and pagination
router.get("/transactions", transactionsController.listTransactions);

// API for statistics
router.get("/statistics", transactionsController.getStatistics);

// API for generating the bar chart
router.get("/bar-chart", transactionsController.generateBarChart);

module.exports = router;
