const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
  carnet: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  carrera: { type: String, required: true },
  // Tarea 2: Relación referenciada hacia LineaInvestigacion
  lineaInvestigacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LineaInvestigacion",
  },
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
