const express = require('express');
const dotenv=require('dotenv');
const connectdb = require('./config/db');

//local environment variables
dotenv.config();

//connect to mongodb
connectdb();


const app=express();

app.use(express.json());
//body parser middleware

const authroutes=require('./routes/auth');
//routes
app.use('/api/auth', authroutes);


//start the server
const PORT=process.env.PORT ||  3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
