const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDb = require('./config/connectToDb.js');
const Rental = require('./model/rentalSchema.js')

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//MongoDB connection
connectToDb()

//Routing to pages
app.get('/', (req,res)=>{
    res.send("Hello")
})

// Routes
app.post('/api/rentals', async (req, res) => {
    const rental = new Rental(req.body);
    await rental.save();
    res.send(rental);
  });


app.listen(PORT,()=>{
    console.log('Server is running at Port:', PORT);
})
    