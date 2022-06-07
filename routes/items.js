"use strict";

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res, next) => {
  const items = await Item.find();
  res.json({ result: items });
});

//module.exports = router;
