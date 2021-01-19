const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const config = require("./config");

const todoRoutes = require('./app/routes/todo');

app.use(cors());

app.use(express.urlencoded({ extended: true})); //parses application/x-www-form-urlencoded requests
app.use(express.json()); //parses json request

//connect to MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if(!error) {
    console.log("Connected to MongoDB");
  } else {
    console.log(error);
  }
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});