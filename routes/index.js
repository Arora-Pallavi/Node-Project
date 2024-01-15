const express = require("express");
const router = express.Router();
const authentication = require("./Authentication");
const user = require("./User");
const auth = require("../middlewares/auth");
const get = require("./User/get");
const getMember = require("./User/member/post/getUser");
const username = require("./User/update/username");
const registerMember = require("./User/member/post/post");
const getHotel=require('./User/member/get/get')
const password = require("./User/update/password");
const extractParam = require("../middlewares/extractParams/extractParams");
const getInfo = require("./User/getInfo");
const searchHotels=require('./User/searchHotels');
const deleteHotel=require('./User/member/deleteHotel')
router.use("/auth", authentication);
router.use("/register", user);
router.get("/getUserData", extractParam("authToken"), auth, get);
router.put("/username/:id", extractParam("id"), username);
router.put("/password/:id", extractParam("id"), password);
router.get('/getInfo/:id', extractParam("id"),auth,getInfo )
router.get('/hotels',auth,getHotel);
router.get('/searchHotels',auth,searchHotels)
router.post("/getMember", getMember);
router.delete('/deleteHotel/:id',extractParam("id"),deleteHotel);
// router.post('/registerMember',registerMember)
module.exports = router;
