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


app.get('/create-item', (req, res) => {
  const item = new Item({
    name: 'computer',
    price: 2000
  });
  item.save().then(result=>res.send(result))
})
app.get('/get-items', (req, res) => {
  
  Item.find().then(result=>res.send(result)).catch((err)=>console.log(err))
})
app.get('/get-item', (req, res) => {
  
  Item.findById("6054ea245d57128bcb88d39c").then(result=>res.send(result)).catch((err)=>console.log(err))
})
app.get('/', (req, res) => {
  const items = [
    { name: 'mobile phone', price: 1000 },
    { name: 'book', price: 30 },
    { name: 'computer', price: 2000 },
  ]
  res.render('index', { items })
})
app.get('/add-item', (req, res) => {
  res.render('add-item')
})
app.use((req, res) => {
  res.render('error')
})