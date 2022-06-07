"use strict";

const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connection(process.env.CONN_STRING);
};

main().catch((error) => console.log(error));
