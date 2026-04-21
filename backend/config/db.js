const mongoose = require("mongoose");

// this function connects to MongoDB using the URI from .env
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected:", conn.connection.host);
};

module.exports = connectDB;