const mysql = require("mysql");
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const axios = require('axios')
var cors = require('cors');

app.use(bodyparser.json());
app.use(cors());


tax_req = {
  "from_country": "CA",
  "to_country": "CA",
  "amount": 0,
  "shipping": 0,
  "to_state": "ON"
}

var mysqlConnection = mysql.createConnection({
  host: 'host.docker.internal',
  user: 'customer',
  password: 'customerpw',
  database: 'customer'
});

mysqlConnection.connect((err) => {
  if (!err)
    console.log('DB connection succeded.');
  else
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.get('/items', (req, res) => {
  mysqlConnection.query('SELECT * FROM items', (err, rows, fields) => {
    if (err) {
      res.status(500)
    } else {
      res.send(rows)
    }
  });
});

app.post('/calculate', (req, res) => {
  if (req && req.body && req.body.customer_id && req.body.items) {
    response = {}
    mysqlConnection.query('SELECT * FROM customers WHERE id=' + req.body.customer_id, (err, rows, fields) => {
      if (!err) {
        if (rows.length) {
          response['customer'] = rows[0]
          items_quantity = {}
          items = []
          req.body.items.map(item => {
            items_quantity[item.id] = item.quantity
            items.push(item.id)
          });
          if (items.length) {
            mysqlConnection.query('SELECT * FROM items WHERE id in (' + items.toString() + ')', (item_err, item_rows, item_fields) => {
              if (!err) {
                if (item_rows.length) {
                  amount = 0
                  item_rows.map(item => {
                    if (items_quantity[item.id]) {
                      amount += (items_quantity[item.id] * item.price)
                    }
                  })
                  console.log("Total amount", amount);
                  response["amount_before_tax"] = amount;
                  tax_req.amount = amount;
                  console.log(tax_req)
                  axios.post('https://api.taxjar.com/v2/taxes', tax_req, {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer 08392b4b73b618ebae655172b1a6c5c2"
                    }
                  }).then(tax_res => {
                    response['items'] = item_rows
                    response['tax'] = tax_res.data.tax.amount_to_collect
                    response['amount_after_tax'] = response.tax + amount;
                    res.send(response);
                  })
                    .catch(() => {
                      res.status(500)
                    });
                }
                else {
                  res.status(500)
                  res.send(err)
                }
              } else {
                res.status(500)
                res.send("No items found");
              }
            })
          } else {
            res.status(500)
            res.send("No items found");
          }
        } else {
          res.status(500)
          res.send("No customer found");
        }
      } else {
        res.status(500)
        res.send(err)
      }
    })
  } else {
    res.status(500)
    res.send("Request Error")
  }
})

app.listen(3000, () => console.log('Express server is running under port no : 3000'));