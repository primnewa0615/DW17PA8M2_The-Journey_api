'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "idUser",
        }
      });

      Bookmark.belongsTo(models.journey, {
        as: "journey",
        foreignKey: {
          name: "idJourney",
        }
      })

    }
  };
  Bookmark.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      as: "user",
      foreignKey: {
        name: "idUser",
      }
    },
    idJourney: {
      type: DataTypes.INTEGER,
      as: "journey",
      foreignKey: {
        name: "idJourney",
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};