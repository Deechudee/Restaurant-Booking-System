const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const { getAnalytics } = require("../controllers/adminController");

const router = express.Router();

router.get('/analytics', protect, admin, getAnalytics);

module.exports = router;

