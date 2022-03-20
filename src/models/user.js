const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  isRegistered:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false,
  },
  college:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsappNumber:{
    type: DataTypes.STRING,
    allowNull:true,
  },
  githubUsername:{
    type: DataTypes.STRING,
    allowNull:true,
  },
  isOrganiser:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false,
  }
});

module.exports = User;
