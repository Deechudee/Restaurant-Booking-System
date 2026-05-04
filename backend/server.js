const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const tableRoutes = require("./routes/tableRoutes");
const adminRoutes = require("./routes/adminRoutes");
const waitlistRoutes = require("./routes/waitlistRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Make io global for controllers
global.io = io;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Restaurant System API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/waitlist", waitlistRoutes);

// Socket events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-tables', () => {
    socket.join('tables');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));


