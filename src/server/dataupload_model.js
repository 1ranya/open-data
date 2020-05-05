const fs = require("fs");
const fastcsv = require("fast-csv");
const Pool = require('pg').Pool
const ws = fs.createWriteStream("information_espace_publique_Paris.csv");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OpenData',
  password: '19951995',
  port: 5432,
});

const fetchCsvFile = () =>{
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM datafromcsv ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);

      const jsonData = JSON.parse(JSON.stringify(results.rows));
      fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("Write to bezkoder_postgresql_fastcsv.csv successfully!");
      })
      .pipe(ws);
    })
  })
}

const insertCsvData = (body) => {
  return new Promise(function(resolve, reject) {
    const { information, value } = body
    pool.query('INSERT INTO datafromCsv (information, value) VALUES ($1, $2) RETURNING *', [information, value], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}

module.exports = {
  insertCsvData,
  fetchCsvFile
}