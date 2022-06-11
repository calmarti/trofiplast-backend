const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  group /*taxonomic group*/ : { type: String },
  family: { type: String },
  genus: { type: String },
  species: { type: String },
  location: { type: String },
  country: { type: String },
  date1: { type: Date, /*get: changeDateFormat*/ },    //cambiar formato del TYPE de ser necesario con plugin "mongoose-plugin-date-format" o bien cambiar el formato al recuperar de la bd con un custom getter (changeDateFormat)
  //date 2
  //date 3
  items: { type: String }, 
  reference: { type: String }, 
  href: {type: String }, //type preeliminar, tal vez será un custom type
  image: { type: String },
});

const Item = mongoose.model("Item", itemSchema);

//opcional: no hace falta (¿porqué no?)
module.exports = Item;
