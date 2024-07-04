"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notes.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Notes.init(
    {
      title: DataTypes.STRING,
      note: DataTypes.TEXT,
      img_url: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Notes",
    },
  );
  return Notes;
};
