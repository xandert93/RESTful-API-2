//Inject .env into process.env when app is run
require('dotenv').config();

const subscribersRouter = require('./routes/subscribers');
const express = require('express');
const app = express();
app.use(express.json());

const { connect, connection, Schema, model } = require('mongoose');

connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('error', (err) => console.error(err));
connection.once('open', () => console.log('connected to subscribersDB'));

app.use('/subscribers', subscribersRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log('Server started + listening for requests')
);
