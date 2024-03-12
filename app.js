// Basic libraries import
const express = require("express")
const app = new express();
const router = require("./src/route/api")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const helmet = require("helmet")
const cors = require("cors")
const mongoose = require("mongoose")


// cors implementation

app.use(cors())


// security implementation

app.use(helmet())
app.use(hpp())
app.use(express.json({limit:"20mb"}))
app.use(express.urlencoded({extended:true}))

// limiter

const limiter = rateLimit({windowMs: 15*60*1000,max:3000})
app.use(limiter)

// Mongodb database connection

let URL = "mongodb://localhost:27017/TaskManager"
mongoose
    .connect(URL)
    .then((res)=>{
        console.log("Database Connection")
    })
    .catch((err)=>{
        console.log(err)
    })


// Route Implementation

app.use(router);

// Error 404 not found

app.use("*", (req, res)=>{
    res.status(404).json({data:"Not Found"})
})

// All module export

module.exports = app





