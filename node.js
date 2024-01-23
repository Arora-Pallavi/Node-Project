const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./db/connect");
const multer = require("multer");
const memberRegister = require("./routes/User/member/post/post");
const addHotel = require("./routes/User/member/addHotel");
const addRooms = require("./routes/rooms/addRooms");
const extractParam = require("./middlewares/extractParams/extractParams");
const EditRooms = require("./routes/rooms/EditRooms");
const updateHotel=require('./routes/User/member/updateHotel');
const auth = require("./middlewares/auth");
const { Server } = require('socket.io');
const http = require('http');
const billingSchema = require("./models/Billing/billingSchema");
dotenv.config();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Access-Control-Allow-Credentials",
//   ],
// };
app.use(cors())
// const server = require("http").createServer();
const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });


io.on("connection", (client) => {

  console.log('hello user');
 client.on("send_Message",(data)=>{
  console.log(data)
    const result = "";
    if (!data.guestName) {
      const get=async()=>{
       const result =  await new billingSchema({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          hotelId:data.hotelId,
          roomId:data.roomId,
          startDate:data.startDate,
          endDate:data.endDate,
          days:data.days,
          totalGuests:data.guests,
          status:"pending"
        });
        const yes=await result.save();
        if(yes){
          client.broadcast.emit("recieved",true)
        }
      
      }
     get();
    } else {
      const get=async()=>{
        result = await new billingSchema({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          guestName: data.guestName,
          guestEmail: data.guestEmail,
        });
        const yes=await result.save();
        if(yes){
          client.broadcast.emit("recieved",true)
        }
      
      }
        get();
    }
    
 })

});


const storage = multer.diskStorage({ 
  destination: function (req, files, cb) {
    let fileLocation = "./Images/";
    // let fileLocation = "/home/prologic/Documents";
    cb(null, fileLocation);
  },
  filename: function (req, files, cb) {
    let fileName = Date.now() + files.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});
app.use("/Images", express.static("Images/"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);
app.post("/registerMember", upload.array("files"), memberRegister);
app.post("/addHotel", upload.array("files"), addHotel);
app.post("/uploadRooms/:id",extractParam("id"),upload.array("files",4), addRooms);
app.post("/uploadRooms",auth,extractParam("id"),upload.array("files",4), addRooms);
app.post('/editRoom',auth,upload.array("files",4),EditRooms)
app.post('/editRoom/:id',extractParam("id"),upload.array("files",4),EditRooms)
app.post("/uploadRooms",auth,upload.array("files"), addRooms);
app.put('/updateHotel', upload.single('files'),updateHotel)
connect();

// app.use((err,req,res)=>{
//   res.status(err?.statusCode ||500).json({
//     message: err.message ?? "Server error. Please try again later.",
//   });
// })

server.listen(8000, () => {
  console.log("Listening on port 8000....");
});
