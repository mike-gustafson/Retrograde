const request = require('supertest');
const app = require('../app');
const { User } = require('../../models');
const getGamesOwned = require('../utils/get-user-games-owned.util');
const parsePlatformGamenameObjectIntoStrings = require('../../utils/parse-platform-gamename-object into strings');

describe('GET /', () => {
  test('should return the user profile', async () => {
    User.findOne = jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      games_wishlist: {},
    });

    getGamesOwned.mockResolvedValue({
      userGames: [],
      uniqueGames: [],
    });

    parsePlatformGamenameObjectIntoStrings.mockResolvedValue([]);

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        games_wishlist: {},
      },
      userGames: [],
      uniqueGames: [],
      req: {},
      wishlist: [],
    });
  });
});

describe('GET /user', () => {
  test('should return the user information', async () => {
    const req = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        platforms_owner: [],
      },
    };

    const response = await request(app).get('/user').send(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      platforms_owner: [],
    });
  });
});