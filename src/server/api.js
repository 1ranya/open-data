const express = require('express');
const app = express();
const port = 3001;

const dataupload_model = require('./dataupload_model');
const data = []
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/csv-data', (req, res)=>{
  dataupload_model.fetchCsvFile()
  .then(response =>{
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/merchants', (req, res) => {
  dataupload_model.insertCsvData(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app.listen(3000);
