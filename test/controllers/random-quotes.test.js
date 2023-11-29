const expect = require('chai').expect;
const request = require('supertest');
const fs = require('fs');
const app = require('../../server');

describe('Random Quotes Controller', function() {
  describe('GET /random-quote', function() {
    it('should return a random quote and its attribution', function(done) {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          done(err);
        } else {
          const quotes = JSON.parse(data);
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];

          request(app)
            .get('/random-quote')
            .expect(200)
            .end(function(err, res) {
              if (err) {
                done(err);
              } else {
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