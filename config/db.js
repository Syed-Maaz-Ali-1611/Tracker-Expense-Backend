const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Connected With Database (MONGODB) ")
    } catch (err) {
        console.error("Error connecting to mongodb ", err);
        process.exit(1)
    }
};

module.exports = connectDB;