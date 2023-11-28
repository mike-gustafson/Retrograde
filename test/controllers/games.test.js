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
});const request = require('supertest');
const app = require('../app');
const { Game, Platform, User } = require('../../models');

describe('Games API', () => {
  describe('GET /games', () => {
    it('should return all games on consoles and handhelds', async () => {
      const response = await request(app).get('/games');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('games');
      expect(response.body.games).toBeInstanceOf(Array);
    });

    it('should return 500 Internal Server Error if an error occurs', async () => {
      jest.spyOn(Platform, 'findAll').mockRejectedValueOnce(new Error('Database error'));
      const response = await request(app).get('/games');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  describe('GET /games/byId/:gameId', () => {
    it('should return a single game by ID', async () => {
      const gameId = 1; // Replace with a valid game ID
      const response = await request(app).get(`/games/byId/${gameId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('game');
      expect(response.body).toHaveProperty('cover');
    });

    it('should return 500 Internal Server Error if an error occurs', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));
      const gameId = 1; // Replace with a valid game ID
      const response = await request(app).get(`/games/byId/${gameId}`);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  describe('POST /games/add-to-collection', () => {
    it('should add a game to the user\'s collection', async () => {
      const userId = 1; // Replace with a valid user ID
      const gameId = 1; // Replace with a valid game ID
      const platformId = 1; // Replace with a valid platform ID
      const response = await request(app)
        .post('/games/add-to-collection')
        .send({ userId, gameId, platformId });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', `Game ${gameId} added to collection`);
    });

    it('should return 500 Internal Server Error if an error occurs', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));
      const userId = 1; // Replace with a valid user ID
      const gameId = 1; // Replace with a valid game ID
      const platformId = 1; // Replace with a valid platform ID
      const response = await request(app)
        .post('/games/add-to-collection')
        .send({ userId, gameId, platformId });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  // Add tests for other routes (e.g., POST /games/remove-from-collection, POST /games/add-to-wishlist, etc.)
});