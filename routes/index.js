const router = require("express").Router();
const roomRouter = require("./room");
const customerRouter = require("./customer");

router.get("/", (req, res) => {
  res.json("Hall booking api is working!");
});

router.use("/rooms", roomRouter);

router.use("/customers", customerRouter);

module.exports = router;
