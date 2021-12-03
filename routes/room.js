const router = require("express").Router();
const Room = require("../models/rooms");

router.get("/", (req, res) => {
  res.json("Room router is working!");
});

router.post("/add", async (req, res) => {
  try {
    const roomData = await  Room.create(req.body);
    res.json(roomData);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Room.find({})
      .populate("customers", "-_id -__v -roomId -createdAt")
      .sort({ room_no: 1 })
      .select("room_no booked_status");
    res.json(data);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
