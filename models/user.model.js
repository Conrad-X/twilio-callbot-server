const { DataTypes, Model } = require("sequelize");
const { database } = require("../configs/database.config");

class User extends Model {
  getFullname() {
    return [this.firstName, this.lastName].join(" ");
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "pending", "deleted"],
      defaultValue: "pending",
    },
  },
  {
    sequelize: database,
    modelName: "User",
    timestamps: true,
  }
);

module.exports = {
  User,
};
