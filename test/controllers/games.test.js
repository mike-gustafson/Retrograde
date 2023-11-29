const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Games Controller', function() {
  describe('GET /games', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/games').expect(200, done);
    });
  });

  describe('GET /games/byId/:gameId', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/games/byId/1').expect(200, done);
    });
  });

  describe('POST /games/add-to-collection', function() {
    it('should return a 200 response', function(done) {
      request(app).post('/games/add-to-collection')
        .send({
          userId: 1,
          gameId: 1,
          platformId: 1
        })
        .expect(200, done);
    });
  });

  describe('POST /games/remove-from-collection', function() {
    it('should return a 200 response', function(done) {
      request(app).post('/games/remove-from-collection')
        .send({
          userId: 1,
          gameId: 1,
          platformId: 1
        })
        .expect(200, done);
    });
  });

  describe('POST /games/add-to-wishlist', function() {
    it('should return a 200 response', function(done) {
      request(app).post('/games/add-to-wishlist')
        .send({
          userId: 1,
          gameId: 1,
          platformId: 1
        })
        .expect(200, done);
    });
  });

  describe('POST /games/remove-from-wishlist', function() {
    it('should return a 200 response', function(done) {
      request(app).post('/games/remove-from-wishlist')
        .send({
          userId: 1,
          gameId: 1,
          platformId: 1
        })
        .expect(200, done);
    });
  });
});