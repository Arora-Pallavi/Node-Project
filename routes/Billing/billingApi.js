const billingSchema = require("../../models/Billing/billingSchema");
const post = async (req, res) => {
  try {
    // const result = "";
    // if (!req.body.guestName) {
    //   result = await new billingSchema({
    //     fullName: req.body.fullName,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     bookFrom: req.body.startdate,
    //     bookTo: req.body.enddate,
    //     totalDays: req.body.totalDays,
    //     totalGuests: req.body.totalGuests,
    //     totalRooms: req.body.totalRooms,
    //   });
    // } else {
    //   result = await new billingSchema({
    //     fullName: req.body.fullName,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     guestName: req.body.guestName,
    //     guestEmail: req.body.guestEmail,
    //   });
    // }
    console.log(req.body);
    // result.save();

    res.send("Data Entered Successfully:)");
  } catch (err) {
    res.send(err);
  }
};
module.exports = post;
