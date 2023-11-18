const mongoose=require('mongoose');

mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("DB successfully connected")})
.catch((err)=>{console.log("failed to connect")})
module.exports-mongoose;