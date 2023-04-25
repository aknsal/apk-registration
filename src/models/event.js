const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Event = sequelize.define("Event", {
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  organiser1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organiser2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  organiser3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rounds:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  about:{
    type: DataTypes.STRING(1234),
    allowNull: false,
  },
  prizes:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalParticipants:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image1:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  image2:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventCode:{
    type: DataTypes.STRING,
    allowNull : false,
  },
  teamSize:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  minTeamSize:{
    type: DataTypes.STRING,
    allowNull:false,
  }
  
});

module.exports = Event;