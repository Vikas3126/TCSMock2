const express=require("express");
const mongoose=require("mongoose")
// const {connection}=require("./db");
const {userRouter}=require("./Backend/Controller/userController")

const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({mesg:"working route"});
})
app.use("/users",userRouter)
app.use('/', employeeRoutes);
app.use(cors());
app.listen(8800,async(req,res)=>{
    
    try {
        await connection
        console.log("Connected to DB");
        console.log("server is runnig at port 8800");
    } catch (error) {
        console.log(error)
    }
})