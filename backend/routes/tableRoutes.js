const express = require("express");
const Table = require("../models/Table");

const router = express.Router();

router.get('/', (req, res) => Table.find().sort('tableNumber'));
router.post('/', (req, res) => {/* admin create tables */});

module.exports = router;

