require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");
let workout = require("./controllers/workoutcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(express.json());

app.use("/user", user);

app.use("/api", workout);

app.listen(6000, function () {
  console.log("App is listening");
});
