const bookings = require("../../../models/Billing/bookingSchema");
const billingDetails = require("../../../models/Billing/bookingSchema");
const hotelDetails = require("../../../models/Hotel/hotelSchema");

/**
 * @method PUT
 * @api  /bookingAccept/:id
 * @description  -changes the status of booking request to accepted
 *  -
 */



module.exports=async(req,res)=>{
    const user=req.user;
    const id=req.id;
    const data= await bookings.findByIdAndUpdate(id,{
        status:"accepted"
    })
   
    const result=await bookings.find({ownerId:user._id,status:"pending"});
    console.log('---------------------------.',result)
    res.send(result)
}