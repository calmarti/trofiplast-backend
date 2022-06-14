"use strict";
require("dotenv").config();
const conn = require("./lib/connectMongoose");
const fs = require("fs");

//TODO: inicialización falla al intentar hacer el cast de date1 (por ser String y no Date), ¿meter un setter en el Schema Type y en el excel separar en campo año y campo mes?

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
