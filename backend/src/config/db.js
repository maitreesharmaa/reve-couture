const mongoose = require ('mongoose');

async function connectDatabase(mongouri){
    const uri = mongouri || process.env.MONGO_URI
    if(!uri){
        throw new Error("MONGO_URI is not defined.");
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        connectTimeoutMS: 10000, // Timeout after 10s
    })
}

module.exports = {connectDatabase};