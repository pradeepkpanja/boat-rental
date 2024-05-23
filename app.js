const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");
const RentalSchema = require("./model/rentalSchema.js");
const connectToDb = require("./config/connectToDb.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Mongo DB connection
connectToDb();

app.get("/api/rentals", async (req, res) => {
  res.json(req.body);
  console.log(req.body);
});

// Endpoint to handle form submission
app.post("/api/rentals", async (req, res) => {
  try {
    const rentalData = req.body;
    const rental = new RentalSchema(rentalData);
    await rental.save();

    const filePath = path.join(__dirname, "Rentals.xlsx");
    let wb;
    let ws;
    let existingData = [];

    if (fs.existsSync(filePath)) {
      wb = XLSX.readFile(filePath);
      ws = wb.Sheets[wb.SheetNames[0]];
      existingData = XLSX.utils.sheet_to_json(ws);
    } else {
      wb = XLSX.utils.book_new();
    }

    // Append the new data to the existing data
    existingData.push(rentalData);

    // Convert the updated data back to a worksheet
    ws = XLSX.utils.json_to_sheet(existingData);

    // Add or update the worksheet in the workbook
    if (wb.SheetNames.includes("RentalData")) {
      wb.Sheets["RentalData"] = ws;
    } else {
      XLSX.utils.book_append_sheet(wb, ws, "RentalData");
    }

    // Write the workbook to the file
    XLSX.writeFile(wb, filePath);

    res.json(rentalData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
