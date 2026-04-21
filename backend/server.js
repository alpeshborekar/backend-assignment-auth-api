const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connect DB
connectDB();


app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/tasks", require("./routes/task"));

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});