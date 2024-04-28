const { DataTypes, Model } = require("sequelize");
const { database } = require("../configs/database.config");
const {Group} = require("./group.model");

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
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Group,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }
  },
  {
    sequelize: database,
    modelName: "Caller",
    timestamps: true,
  }
);

Caller.belongsTo(Group);

module.exports = {
  Caller,
};

