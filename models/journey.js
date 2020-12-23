'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journey.belongsTo(models.User, {
        as: "User",
        foreignKey: {
          name: "userId",
        }
      })

      journey.hasMany(models.Bookmark, {
        as: "bookmark",
        foreignKey: { name: "idJourney" }
      })
    }
  };
  journey.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    userId: {
      as: "User",
      foreignKey: {
        name: "userId",
      },
      type: DataTypes.INTEGER
    },
    description: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'journey',
  });
  return journey;
};