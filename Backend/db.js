const mongoose=require('mongoose');

const mongoURL="mongodb://localhost:27017/Notable?directConnection=true&tls=false&readPreference=primary";

const connectToMongo= async ()=>{
    mongoose.set('strictQuery',false)
    mongoose.connect(mongoURL)
    console.log('mongo connected');
  
}

module.exports=connectToMongo;

