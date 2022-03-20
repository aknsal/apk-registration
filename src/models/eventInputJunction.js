const Event = require("./event");
const Input = require("./input");
const sequelize = require("../database");

const EventInputJuction = sequelize.define("EventInputJuction", {    
    
  });

Input.belongsToMany(Event, {through: "EventInputJuction"});
Event.belongsToMany(Input, {through: "EventInputJuction"});

module.exports  = EventInputJuction;