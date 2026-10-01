const mongoose = require("mongoose");
const lineaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  activa: { type: Boolean, default: true },
});
module.exports = mongoose.model("LineaInvestigacion", lineaSchema);
