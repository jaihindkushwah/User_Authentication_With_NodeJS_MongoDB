const express=require("express");
const app=express();
require("dotenv").config();
const cors=require('cors');
const body_parser=require('body-parser');
const cookieParser=require('cookie-parser');
const port=8000;
const userRouters=require('./routes/userRouters');
require('./configs/dbConfig');
app.use(cors());
app.use(body_parser.json());
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.status(200).json({message:'welcome to express'});
})
app.get("/html",(req,res)=>{
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <h1>Jai Express js</h1>
    </body>
    </html>`)
})

// console.log(userRouters);
app.use('/api',userRouters);




app.listen(port,()=>{
    console.log("express is running on port "+port);
})

