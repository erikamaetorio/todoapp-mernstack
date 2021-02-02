const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;

const conn = require('./db');

const todoRoutes = require('./app/routes/todo');
const categoryRoutes = require('./app/routes/category');

app.use(cors());

app.use(express.urlencoded({ extended: true})); //parses application/x-www-form-urlencoded requests
app.use(express.json()); //parses json request

//connect to MongoDB
conn.connect()
      .then(() => console.log('Connected to DB'))
      .catch((err) => console.log(err));

app.use('/todos', todoRoutes);
app.use('/categories', categoryRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

module.exports = app;