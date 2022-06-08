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

router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const item = await Item.find({ _id: _id });
    res.json({ result: item });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const item = new Item({
      order: req.body.order,
      family: req.body.family,
      genus: req.body.genus,
      species: req.body.species,
      location: req.body.location,
      country: req.body.country,
      date: req.body.date,
      reference: req.body.date,
    });
    const savedItem = await item.save();
    res.status(201).json({ result: savedItem });
  } catch (error) {
    next(error);
  }
});

//module.exports = router;
