const { Sequelize } = require("sequelize");
const fs = require('fs');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "apk-db-do-user-4581189-0.b.db.ondigitalocean.com",
    port:"25060",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(__dirname + '/../certificates/ca-certificate.crt').toString(),
      },
    }
  },
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
