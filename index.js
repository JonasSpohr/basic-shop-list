const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://root:list@ds117271.mlab.com:17271/shoplist');

const app = express()  
const port = 3000;

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))


app.use(express.static(__dirname + '/public'))

app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))  
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(methodOverride())

app.get('/', (request, response) => {  
  response.render('home', { })
})


//model
var Item = mongoose.model('ShopList', {
  name : String,
  quantity : Number
});

// api
app.get('/api/items', function(req, res) {
    Item.find(function(err, items) {

        if (err)
          res.send(err)

        res.json(items);
      });
  });

app.post('/api/item', function(req, res) {
    Item.create({
      name : req.body.name,
      quantity : req.body.quantity
    }, function(err, item) {
      if (err)
        res.send(err);

        Item.find(function(err, items) {
          if (err)
            res.send(err);

          res.json(items);
        });
      });

  });

app.delete('/api/items/:item_id', function(req, res) {
  Item.remove({
    _id : req.params.item_id
  }, function(err, item) {
    if (err)
      res.send(err);

        Item.find(function(err, items) {
          if (err)            
            res.send(err);

          res.json(items);
        });
      });
});


app.listen(port, (err) => {  
  if (err) {
    return console.log('oops, something went wrong :(', err)
  }

  console.log(`listening on ${port}`);
});