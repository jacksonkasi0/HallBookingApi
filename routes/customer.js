const router = require("express").Router();
const Customer = require("../models/customer");
const Room = require("../models/rooms");

router.get("/", (req, res) => {
  res.json("Customer router is working!");
});

router.post("/add", async (req, res) => {
  try {
    const data = await new Customer({
      name: req.body.name,
      date: req.body.date,
      check_in: new Date(req.body.check_in),
      check_out: new Date(req.body.check_out),
      roomId: req.body.roomId,
    });
    const check_date = await Customer.find({
      $or: [
        {
          check_in: {
            $gte: data.check_in,
            $lte: data.check_out,
          },
        },
        {
          check_out: {
            $gte: data.check_in,
            $lte: data.check_out,
          },
        },
      ],
    });

    // This is reject the customer from attempting to book the hall between the already booked dates
    if (check_date.length !== 0) {
      return res.json({
        msg: `Hall could not be booked. Please choose different dates.`,
      });
    }

    const customerData = await data.save();

    const roomData = await Room.findByIdAndUpdate(
      { _id: customerData.roomId },
      { booked_status: true, $push: { customers: customerData._id } },
      {
        new: true,
      }
    );

    res.json({ customer: customerData, room: roomData });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Customer.find({})
      .populate("roomId", "room_no -_id")
      .sort({ name: 1 })
      .select("-_id -__v");
    res.json(data);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
