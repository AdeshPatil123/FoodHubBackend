const express = require('express');
const app = express();
const router = require("./Routes/index");
const port =process.env.PORT||8050;
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('Connect to MongoDB')}).catch((err)=> console.log(err));
app.use(express.json());
app.use(cors());
app.use('/',router);

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server running on port ${port}!`)
})
