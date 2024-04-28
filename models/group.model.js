const { DataTypes, Model } = require("sequelize");
const { database } = require("../configs/database.config");

class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    
  },
  {
    sequelize: database,
    modelName: "Group",
    timestamps: true,
  }
);

module.exports = {
  Group,
};
