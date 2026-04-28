const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bookingRoutes=require("./routes/bookingRoutes");




dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api",bookingRoutes)
app.use("/api/bookings",bookingRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

