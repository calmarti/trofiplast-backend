"use strict";
require("dotenv").config();
require("./lib/connectMongoose");

//TODO: inicialización falla al intentar hacer el cast de date1 (por ser String y no Date), ¿meter un setter en el Schema Type y en el excel separar en campo año y campo mes?

const sample = require("./sample.json"); //sample needs to be an array for 'insertMany' to work
const Item = require("./models/Item");

const initialize = async function () {
  try {
    const result = await Item.deleteMany({});
    console.log(`Deleted items: ${result.deletedCount}`);
    const newItems = await Item.insertMany(sample.items);
    console.log(`New inserted items: ${newItems.length}`);
    newItems.save();
  } catch (error) {
    console.log(error);
  }
};

initialize();