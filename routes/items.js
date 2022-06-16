"use strict";

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res, next) => {
  try {
    console.log(req.query);
    const filters = {};
    const sort = req.query.sort || "_id";
    const skip = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 10000; //reemplazar por el count de registros actualizado

    //TODO: búsqueda por rango de fecha con date1, date2 y date3

    //TODO: considerar cambiar la condición del if statement a undefined
    if (req.query.taxonomic_group)
      filters.taxonomic_group = req.query.taxonomic_group;
    if (req.query.family) filters.family = req.query.family;
    if (req.query.genus) filters.genus = req.query.genus;
    if (req.query.species) filters.species = req.query.species;
    if (req.query.area) filters.area = req.query.area;
    if (req.query.country) filters.country = req.query.country;
    if (req.query.date1) filters.date1 = req.query.date1;
    if (req.query.date2) filters.date2 = req.query.date2;
    if (req.query.date3) filters.date3 = req.query.date3;

    const result = await Item.customFind(filters, sort, skip, limit);

    res.json({ result: result.items });
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
      group: req.body.taxonomic_group,
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

module.exports = router;
