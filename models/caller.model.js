const { DataTypes, Model } = require("sequelize");
const { database } = require("../configs/database.config");

class Caller extends Model {}

Caller.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    accountId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize: database,
    modelName: "Caller",
    timestamps: true,
  }
);

module.exports = {
  Caller,
};
