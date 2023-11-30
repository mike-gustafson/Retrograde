# `RetroGrade`

Video Game collection tracker

Track your collection, create top-10 lists, Share your wishlist with others, See which games your missing!

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

## Users Table

| Column                   | Type                     | Nullable | Default                                   |
|--------------------------|--------------------------|----------|-------------------------------------------|
| id                       | integer                  | not null | nextval('users_id_seq'::regclass)        |
| name                     | character varying(255)   |          |                                           |
| email                    | character varying(255)   |          |                                           |
| password                 | character varying(255)   |          |                                           |
| createdAt                | timestamp with time zone | not null |                                           |
| updatedAt                | timestamp with time zone | not null |                                           |
| games_followed           | integer[]                |          |                                           |
| games_ratings            | integer[]                |          |                                           |
| platforms_owned          | integer[]                |          |                                           |
| platforms_wishlist       | integer[]                |          |                                           |
| platforms_followed       | integer[]                |          |                                           |
| platforms_ranked         | integer[]                |          |                                           |
| games_owned              | jsonb                    |          |                                           |
| games_owned_prev         | jsonb                    |          |                                           |
| games_owned_was_updated  | boolean                  |          |                                           |
| unique_games_owned       | integer                  |          |                                           |
| games_wishlist_was_updated| boolean                  |          |                                           |
| games_wishlist           | jsonb                    |          |                                           |


## Platforms Table

| Column           | Type                   | Nullable | Default |
|------------------|------------------------|----------|---------|
| id               | integer                | not null |         |
| abbreviation     | character varying(255) |          |         |
| alternative_name | character varying(255) |          |         |
| category         | integer                |          |         |
| name             | character varying(255) |          |         |
| summary          | text                   |          |         |
| slug             | character varying(255) |          |         |
| generation       | integer                |          |         |
| platform_logo    | integer                |          |         |
| platform_family  | integer                |          |         |

## Platform Logos Table

| Column        | Type                   | Nullable | Default |
|---------------|------------------------|----------|---------|
| id            | integer                | not null |         |
| alpha_channel | boolean                |          |         |
| animated      | boolean                |          |         |
| checksum      | character varying(255) |          |         |
| height        | integer                |          |         |
| url           | character varying(255) |          |         |
| width         | integer                |          |         |
| image_id      | character varying(255) |          |         |


## Games Table

| Column                  | Type                   | Collation | Nullable | Default |
|-------------------------|------------------------|-----------|----------|---------|
| age_ratings             | integer[]              |           |          |         |
| aggregated_rating       | double precision       |           |          |         |
| aggregated_rating_count | integer                |           |          |         |
| alternative_names       | integer[]              |           |          |         |
| artworks                | integer[]              |           |          |         |
| bundles                 | integer[]              |           |          |         |
| category                | integer                |           |          |         |
| checksum                | uuid                   |           |          |         |
| collection              | integer                |           |          |         |
| collections             | integer[]              |           |          |         |
| cover                   | integer                |           |          |         |
| created_at              | bigint                 |           |          |         |
| dlcs                    | integer[]              |           |          |         |
| expanded_games          | integer[]              |           |          |         |
| expansions              | integer[]              |           |          |         |
| external_games          | integer[]              |           |          |         |
| first_release_date      | bigint                 |           |          |         |
| follows                 | integer                |           |          |         |
| forks                   | integer[]              |           |          |         |
| franchise               | integer                |           |          |         |
| franchises              | integer[]              |           |          |         |
| game_engines            | integer[]              |           |          |         |
| game_localizations      | integer[]              |           |          |         |
| game_modes              | integer[]              |           |          |         |
| genres                  | integer[]              |           |          |         |
| hypes                   | integer                |           |          |         |
| involved_companies      | integer[]              |           |          |         |
| keywords                | integer[]              |           |          |         |
| language_supports       | integer[]              |           |          |         |
| multiplayer_modes       | integer[]              |           |          |         |
| name                    | character varying(255) |           |          |         |
| parent_game             | integer                |           |          |         |
| platforms               | integer[]              |           |          |         |
| player_perspectives     | integer[]              |           |          |         |
| ports                   | integer[]              |           |          |         |
| rating                  | double precision       |           |          |         |
| rating_count            | integer                |           |          |         |
| release_dates           | integer[]              |           |          |         |
| remakes                 | integer[]              |           |          |         |
| remasters               | integer[]              |           |          |         |
| screenshots             | integer[]              |           |          |         |
| similar_games           | integer[]              |           |          |         |
| slug                    | character varying(255) |           |          |         |
| standalone_expansions   | integer[]              |           |          |         |
| status                  | integer                |           |          |         |
| storyline               | text                   |           |          |         |
| summary                 | text                   |           |          |         |
| tags                    | integer[]              |           |          |         |
| themes                  | integer[]              |           |          |         |
| total_rating            | double precision       |           |          |         |
| total_rating_count      | integer                |           |          |         |
| updated_at              | bigint                 |           |          |         |
| url                     | character varying(255) |           |          |         |
| version_parent          | integer                |           |          |         |
| version_title           | character varying(255) |           |          |         |
| videos                  | integer[]              |           |          |         |
| websites                | integer[]              |           |          |         |
| id                      | integer                |           |          |         |



### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /games | games.js | Gets all Games |
| GET | /games/byId/:gameId | games.js | Fetches One Game |
| POST | /games/add-to-collection | games.js | Adds a game to Users Collection |
| DELETE | /games/remove-from-collection | games.js | Removes a game from Users Collection |
| POST | /games/add-to-wishlist | games.js | Adds a game to Users Wishlist |
| POST | /games/remove-from-wishlist | games.js | Removes a game from Users Wishlist |
| GET | /platforms | platforms.js | Gets all Systems |
| GET | /platforms/:platformId/games | platforms.js | Fetches all Games for a System |
| GET | /platforms/:platformId | platforms.js | System Details Page |
| GET | /profile | profiles.js | Regular User Profile |
| GET | /profile/user | profiles.js | Get user info |
| GET | /random-quote | random-quotes.js | Gets Random Quote for Homepage |
| PUT | /profile/edit | profiles.js | Edit user profile details |

## `1` Fork & Clone Project & Install Dependencies
`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We have the current packages for `authentication`. These are the following packages:

-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.


## `2` Create Database & Update Sequelize Config

`1` Update **`config.json`** file with the following:

```json
{
  "development": {
    "database": "express_auth_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "express_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
    }
  }
}
```

`2` Create database `retrograde`

```text
sequelize db:create
```



## `3` Analyze File Structure

```text
├── config
│   └── config.json
|   └── ppConfig.js
├── controllers
│   └── auth.js
|   └── games.js
|   └── platforms.js
|   └── profiles.js
|   └── random-quotes.js
|-- data
|   └── quotes.json
|-- middleware
|   └── fetchPlatformsFromLocal.js
|   └── isLoggedIn.js
|-- migrations
|   └── ...
├── models
|   └── games.js
│   └── index.js
|   └── platform-logo.js
|   └── platform.js
|   └── user.js
├── node_modules
│   └── ...
├── public
│   └── assets
│   └── css
│       └── style.css
|   └── javascript
├── test
|   └── controllers
│       └── auth.test.js
│       └── games.test.js
│       └── platforms.test.js
│       └── profiles.test.js
│       └── random-quotes.js
│   └── index.test.js
│   └── user.test.js
|-- utils
│   └── get-user-games-owned.util.js
│   └── parse-platform-gamename-object into strings.js
│   └── random-number-generator.util.js
│   └── sort-data.util.js
├── views
│   └── auth
│       └── login.ejs
│       └── signup.ejs
│   └── games
│       └── _list.ejs
│       └── details.ejs
│       └── games.ejs
│       └── index.ejs
│   └── partials
│       └── _footer.ejs
│       └── _navbar.ejs
│       └── alerts.ejs
│   └── platforms
│       └── details.ejs
│       └── index.ejs
│   └── profile
│       └── _user-collection.ejs
│       └── profile.ejs
│       └── profile.js
│   └── homepage.ejs
│   └── layout.ejs
│   └── scripts.ejs
│   └── styles.ejs
|-- .env
├── .gitignore
|-- database.js
├── package-lock.json
├── package.json
├── README.md
|-- readme2.md
├── server.js
```

- `config.json`: Where you need to configure your project to interact with your postgres database.
- `controllers`: The folder where all of your controllers ( routes ) will go to control the logic of your app.
- `models`: The folder where all the models will be stored that will interact with the database.
- `node_modules`: The folder that is generated by **npm** that stores the source code for all dependencies installed.
- `public`: is to have those views that would be publicly accessible in the application. ex. `style.css`
- `test`: The folder where all your test that you make will be stored. ex. `auth.test.js`
- `views`: The folder where all the app's templates will be stored for displaying pages to the user. ex. `login.ejs`
- `.gitignore`: A hidden file that will hide and prevent any files with to NOT get pushed to Github.
- `package-lock.json`: is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: The settings file that stores scripts and list of dependencies that are used inside your app.
- `README.md`: The main markdown file that written to explain the details your app.
- `server.js`: The main file that controls the entire application.