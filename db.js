const Sequelize = require("sequelize");

const sequelize = new Sequelize("Workout", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

module.exports = sequelize;
