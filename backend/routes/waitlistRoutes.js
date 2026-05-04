const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addToWaitlist, getWaitlist, promoteWaitlist } = require("../controllers/waitlistController");

const router = express.Router();

router.post('/', protect, addToWaitlist);
router.get('/', protect, getWaitlist);
router.post('/promote', protect, promoteWaitlist);

module.exports = router;

