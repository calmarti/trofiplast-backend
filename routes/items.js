"use strict";

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find();
    res.json({ result: items });
  } catch (error) {
    next(error);
  }
});

//module.exports = router;
