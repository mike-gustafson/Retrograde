const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Platforms Controller', function() {
  describe('GET /platforms', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/platforms').expect(200, done);
    });

    it('should render the index view', function(done) {
      request(app).get('/platforms').end(function(err, res) {
        expect(res.text).to.include('<h1>Platform Index</h1>');
        done();
      });
    });

    it('should pass the sorted platforms and platform logos to the view', function(done) {
      request(app).get('/platforms').end(function(err, res) {
        expect(res.body.sortedPlatforms).to.be.an('array');
        expect(res.body.platformLogos).to.be.an('array');
        done();
      });
    });

    it('should handle errors and return a 500 response', function(done) {
      const findAllStub = sinon.stub(Platform, 'findAll').throws(new Error('Database error'));

      request(app).get('/platforms').expect(500, function(err, res) {
        findAllStub.restore();
        done();
      });
    });
  });

  describe('GET /platforms/:platformId/games', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/platforms/1/games').expect(200, done);
    });

    it('should render the games list view', function(done) {
      request(app).get('/platforms/1/games').end(function(err, res) {
        expect(res.text).to.include('<h1>Games List</h1>');
        done();
      });
    });

    it('should pass the sorted games and platform object to the view', function(done) {
      request(app).get('/platforms/1/games').end(function(err, res) {
        expect(res.body.games).to.be.an('array');
        expect(res.body.platform).to.be.an('object');
        done();
      });
    });

    it('should handle errors and return a 500 response', function(done) {
      const findAllStub = sinon.stub(Game, 'findAll').throws(new Error('Database error'));

      request(app).get('/platforms/1/games').expect(500, function(err, res) {
        findAllStub.restore();
        done();
      });
    });
  });

  describe('GET /platforms/:platformId', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/platforms/1').expect(200, done);
    });

    it('should render the platform details view', function(done) {
      request(app).get('/platforms/1').end(function(err, res) {
        expect(res.text).to.include('<h1>Platform Details</h1>');
        done();
      });
    });

    it('should pass the platform, platform logo, games, and user object to the view', function(done) {
      request(app).get('/platforms/1').end(function(err, res) {
        expect(res.body.platform).to.be.an('object');
        expect(res.body.platformLogo).to.be.an('object');
        expect(res.body.games).to.be.an('array');
        expect(res.body.user).to.be.an('object');
        done();
      });
    });

    it('should handle errors and return a 500 response', function(done) {
      const findByPkStub = sinon.stub(Platform, 'findByPk').throws(new Error('Database error'));

      request(app).get('/platforms/1').expect(500, function(err, res) {
        findByPkStub.restore();
        done();
      });
    });
  });
});