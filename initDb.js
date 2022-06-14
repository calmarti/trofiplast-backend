"use strict";
require("dotenv").config();
const conn = require("./lib/connectMongoose");
const fs = require("fs");

const sample = "./sample.json";
const Item = require("./models/Item");

const loadJson = async function (file) {
  const dataPromise = new Promise((resolve, reject) => {
    fs.readFile(file, function (error, data) {
      resolve(data);
      reject(error);
    });
  });
  try {
    const rawData = await dataPromise;
    console.log(`Initialization file ${file} loaded`);
    if (!rawData) {
      console.log(`${file} is empty!`);
      return;
    }
    const data = JSON.parse(rawData).items;
    console.log(`Initialization file ${file} parsed`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const initialize = async function () {
  try {
    const result = await Item.deleteMany({});
    console.log(`Deleted items: ${result.deletedCount}`);
    const data = await loadJson(sample);
    const newItems = await Item.insertMany(data);
    console.log(`New inserted items: ${newItems.length}`);
  } catch (error) {
    console.log(error);
  }
};

initialize().then(() => conn.close());
