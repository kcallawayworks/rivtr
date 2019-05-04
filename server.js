const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/howtos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});


let categorySchema = require('./models/category.model');

const categoryRoutes = express.Router();
app.use('/categories', categoryRoutes);

categoryRoutes.route('/').get(function(req, res) {
  categorySchema.find(function(err, categories) {
    if (err) {
      console.log(err);
    } else {
      res.json('Greetings from the test controller');
    }
  });
});



app.listen(PORT, function() {
  console.log("Server is running on PORT: " + PORT);
});