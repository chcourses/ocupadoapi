// DOTENV
const config = require('dotenv').config();
if (config.error) {
  throw config.error;
}
console.log(config.parsed);

// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorMiddleeware = require('./middleware/exceptions');
const userRoutes = require('./routes/api/userRoutes');

// EXPRESS
const app = new express();

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/api/users', userRoutes);

// ERROR MIDDLEWARE
app.use(errorMiddleeware);

// CONNECT TO MONGODB AND LISTEN
mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(config => {
    console.log('Connected...');
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);
