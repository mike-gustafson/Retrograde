const request = require('supertest');
const app = require('../app');
const { User } = require('../../models');
const getGamesOwned = require('../utils/get-user-games-owned.util');
const parsePlatformGamenameObjectIntoStrings = require('../../utils/parse-platform-gamename-object into strings');

describe('GET /', () => {
  test('should return the user profile', async () => {
    // Mock the User.findOne method to return a user object
    User.findOne = jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      games_wishlist: {},
    });

    // Mock the getGamesOwned function to return user games and unique games
    getGamesOwned.mockResolvedValue({
      userGames: [],
      uniqueGames: [],
    });

    // Mock the parsePlatformGamenameObjectIntoStrings function to return a wishlist
    parsePlatformGamenameObjectIntoStrings.mockResolvedValue([]);

    // Make a GET request to the / route
    const response = await request(app).get('/');

    // Assert the response status code and body
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
    // Mock the req.user object
    const req = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        platforms_owner: [],
      },
    };

    // Make a GET request to the /user route
    const response = await request(app).get('/user').send(req);

    // Assert the response status code and body
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      platforms_owner: [],
    });
  });
});