const expect = require('chai').expect;
const request = require('supertest');
const fs = require('fs');
const app = require('../server');

describe('Random Quotes Controller', function() {
  describe('GET /random-quote', function() {
    it('should return a random quote and its attribution', function(done) {
      // Read the quotes file
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          done(err);
        } else {
          const quotes = JSON.parse(data);
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];

          // Make a request to the endpoint
          request(app)
            .get('/random-quote')
            .expect(200)
            .end(function(err, res) {
              if (err) {
                done(err);
              } else {
                // Check if the response matches the random quote
                expect(res.body).to.deep.equal({
                  quote: randomQuote.quote,
                  attrib: randomQuote.attrib
                });
                done();
              }
            });
        }
      });
    });
  });
});