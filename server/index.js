const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routers/appRouter');

dotenv.config();

const app = express();

let options = {
    origin: ["*"]
};

app.use(cors());
app.use(express.json());
app.use(router); // Uncomment once routes are defined

mongoose.set("strictQuery", false);

// ✅ Connect to MongoDB, then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
