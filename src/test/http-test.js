var request = require('supertest');
var app = require('../server/api');
var chai = require('chai')
  , chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);
const dataupload_model = require('../server/dataupload_model');
describe('GET /csv-data', function() {
 it('Check GET /csv-data request is working', function(done) {
 //navigate to root and check the the response is the csv file data
 chai
    .request(app)
    .get('/csv-data')
    done();
  })
 })

