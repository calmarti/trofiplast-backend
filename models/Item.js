const mongoose = require("mongoose");

//TODO: estudiar tema validaciones automáticas del Modelo, validaciones con mongoose y validaciones con express-validator
//Setters allow you to transform the data before it gets to the raw mongodb document or query.
//TODO: setter: antes de ser persistidos los campos 'Date' deben ser pasar de string de tipo "DD/MM/YYYY" a un objeto Date así: new Date(YYYY, MM)

function changeDateFormat(value) {
  if (value instanceof Date) {
    return;
  } else {
    const splittedValue = value.split("/", 3);
    if (splittedValue.length !== 1) {
      const formattedValue = new Date(splittedValue[2], splittedValue[1]);
    } else {
      const formattedValue = new Date(splittedValue[0]);
    }
  }
}


const itemSchema = mongoose.Schema({
  taxonomic_group /*taxonomic group*/: {
    type: String,
    required: true,
    index: true,
  },
  family: { type: String, required: true, index: true },
  genus: { type: String, required: true, index: true },
  species: { type: String, required: true, index: true },
  area: { type: String, required: true },
  country: { type: String, required: true, index: true },
  date1: { type: Date, set: changeDateFormat }, //cambiar formato del TYPE de ser necesario con plugin "mongoose-plugin-date-format" o bien cambiar el formato al recuperar de la bd con un custom getter (changeDateFormat)
  date2: { type: Date, set: changeDateFormat },
  date3: { type: Date, set: changeDateFormat },
  summary: { type: String },
  reference: { type: String },
  href: { type: String }, //type preeliminar, tal vez será un custom type
  image: { type: String },
});

const Item = mongoose.model("Item", itemSchema);

//opcional: no hace falta (¿porqué no?)
module.exports = Item;
