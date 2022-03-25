const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "apk-db-do-user-4581189-0.b.db.ondigitalocean.com",
    port:"25060",
    dialect: "mysql",
    ssl:true,
  }
);

sequelize.sync({alter:true});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
