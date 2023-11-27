'use strict';

const bcrypt = require('bcryptjs'); 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: "Name must be between 1 and 99 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: "Password must be between 8 and 99 characters"
        }
      }
    },
    games_followed: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    games_owned: {
      type: DataTypes.JSONB,
      allowNull: true,
    },  
    games_owned_prev: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    unique_games_owned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    games_owned_was_updated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    games_wishlist: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    games_wishlist_was_updated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    games_ratings: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    platforms_ranked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    platforms_followed: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    platforms_owned: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    platforms_wishlist: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  // Before a user is created, we are encrypting the password and using hash in its place
  User.addHook('beforeCreate', (pendingUser) => { // pendingUser is user object that gets passed to DB
    // Bcrypt is going to hash the password
    let hash = bcrypt.hashSync(pendingUser.password, 12); // hash 12 times
    pendingUser.password = hash; // this will go to the DB
  });  

   // Check the password on Sign-In and compare it to the hashed password in the DB
  User.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); // check to see if password is correct.

    return isCorrectPassword;
  }

  // return an object from the database of the user without the encrypted password
  User.prototype.toJSON = function() {
    let userData = this.get(); 
    delete userData.password; // it doesn't delete password from database, only removes it. 
    
    return userData;
  }

  return User;
};
