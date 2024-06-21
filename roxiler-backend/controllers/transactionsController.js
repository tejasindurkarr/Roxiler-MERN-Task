const express = require('express');
const router = express.Router();
const Transaction = require("../models/Transaction");
const axios = require("axios");

// Controller for initializing the database with seed data
async function initializeDatabase(req, res) {
  try {
    // Fetch JSON data from the third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const jsonData = response.data;

    // Initialize the database with seed data
    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(jsonData); // Insert new data

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    res.status(500).json({ error: "Failed to initialize database" });
  }
}

// Controller to list all transactions with search and pagination
async function listTransactions(req, res) {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    const searchQuery = search.trim();

    // Apply search and pagination
    const transactions = await Transaction.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { price: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Failed to list transactions:", error);
    res.status(500).json({ error: "Failed to list transactions" });
  }
}

// Controller for statistics
async function getStatistics(req, res) {
  try {
    const data = await Transaction.find();

    const { month } = req.query;

    // Validate the month value
    const parsedMonth = parseInt(month, 10);
    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      throw new Error("Invalid month value");
    }
    // Calculate total sale amount
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, parsedMonth],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    // Calculate total sold items
    const totalSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parsedMonth],
      },
    });

      // Calculate total not sold items
    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parsedMonth],
      },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    if (error.message === "Invalid month value") {
      res.status(400).json({ error: "Invalid month value" });
    } else {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  }

}



// Controller for generating the bar chart
async function generateBarChart(req, res) {
  try {
    const { month } = req.query;

    // Define price ranges
    const priceRanges = [
      { range: "0-100", count: 0 },
      { range: "101-200", count: 0 },
      { range: "201-300", count: 0 },
    ];

    // Fetch transactions of the selected month
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
    });

    // Count the number of items in each price range
    transactions.forEach((transaction) => {
      const price = transaction.price;
      if (price >= 0 && price <= 100) {
        priceRanges[0].count++;
      } else if (price >= 101 && price <= 200) {
        priceRanges[1].count++;
      } else if (price >= 201 && price <= 300) {
        priceRanges[2].count++;
      }
    });

    res.status(200).json({ priceRanges });
  } catch (error) {
    console.error("Failed to generate bar chart:", error);
    res.status(500).json({ error: "Failed to generate bar chart" });
  }
}

// Controller for generating the pie chart
async function generatePieChart(req, res) {
  try {
    const { month } = req.query;

    // Fetch transactions of the selected month
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
    });

    // Calculate unique categories and their item counts
    const categoryCounts = {};
    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    res.status(200).json({ categoryCounts });
  } catch (error) {
    console.error("Failed to generate pie chart:", error);
    res.status(500).json({ error: "Failed to generate pie chart" });
  }
}

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  generateBarChart,
  generatePieChart,
};
