const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Input = sequelize.define("Input", {
  inputName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inputVar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inputType:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Input;