const express = require("express");
const app = express();
const mongoose =require("mongoose");
const fileUpload = require("express-fileupload");


require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
   cloud_name :process.env.CLOUDINARY_NAME,
   api_key :process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

const register = require("./src/backend/routes/user");
const login = require("./src/backend/routes/user");

const getAllGames = require("./src/backend/routes/games");
const createGame = require("./src/backend/routes/games");
const getSingleGame = require("./src/backend/routes/games");
const updateGame =require('./src/backend/routes/games');
const deleteGame = require("./src/backend/routes/games");
const uploadImage = require("./src/backend/routes/games");

const notFoundMiddleware = require("./src/backend/middlewares/not-found");
const errorHandlerMiddleware =require("./src/backend/middlewares/error-handler");

app.use(express.json())
app.use(cors());
app.use(fileUpload({useTempFiles:true}));

app.get("/", (req,res)=>{
    res.send("<h1>Connected to the server successfully</h1>")
});

//auth routes:
app.use("/api/v1/auth",register);
app.use("/api/v1/auth",login);

//games routes:
app.use("/api/v1/games",getAllGames);

app.use("/api/v1/games",createGame);

app.use("/api/v1/games/:id",getSingleGame);

app.use("/api/v1/games/:id",updateGame);

app.use("/api/v1/games/:id",deleteGame);

app.post("/api/v1/games",uploadImage);

//middleware:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start =async ()=>{
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(5000,"localhost",()=>{
        console.log("it's on");
        console.log("connected to DB");
        console.log("Server listening on port 5000")
    });
}

start()


