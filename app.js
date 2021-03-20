require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();
const mongodb = process.env.MONGO_DB;
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(() => {
  console.log('connected')
  app.listen(3000);
}).catch(err => console.log(err));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.redirect('/get-items');
})

app.get('/get-items', (req, res) => {

  Item.find().then(result => {

      res.render('index', { items: result });
  }).catch(err => console.log(err))
})
app.get('/add-item', (req, res) => {
  res.render('add-item');
})

app.use((req, res) => {
  res.render('error');
})