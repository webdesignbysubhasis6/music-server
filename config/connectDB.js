const mongoose = require('mongoose');

const dotenv =require('dotenv')

dotenv.config();

const connectDB = () =>{

    mongoose.connect(process.env.DB_URL_HOSTED)
    .then(()=>{
        console.log("DB connection Successful");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;