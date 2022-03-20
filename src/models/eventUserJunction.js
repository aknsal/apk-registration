const Event = require("./event");
const User = require("./user");
const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const EventUserJuction = sequelize.define("EventUserJuction", {  
    teamName:{
        type:DataTypes.STRING,
        allowNull:true
    }  
  });

User.belongsToMany(Event, {through: "EventUserJuction"});
Event.belongsToMany(User, {through: "EventUserJuction"});

module.exports  = EventUserJuction;