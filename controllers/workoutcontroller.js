let express = require("express");
let router = express.Router();

router.get("/practice", function (req, res) {
  res.send("Get Successful");
});

module.exports = router;
