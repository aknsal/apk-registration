const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Event = require("./event")

const EventUpdate = sequelize.define("EventUpdates", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Event.hasMany(EventUpdate, {
  onDelete:'CASCADE'
})
EventUpdate.belongsTo(Event)



module.exports = EventUpdate;