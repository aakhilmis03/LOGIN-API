const mongoose =require('mongoose');
const connectdb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('connected to database');
    }
    catch(error){
        console.error('Mongodb connection error:', error);
        process.exit(1);
    }
};
module.exports=connectdb
