const Linea = require("../models/LineaInvestigacion");

// GET - Listar todas las líneas
exports.obtenerLineas = async (req, res) => {
  try {
    const lineas = await Linea.find();
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener líneas de investigación" });
  }
};

// POST - Crear una nueva línea
exports.crearLinea = async (req, res) => {
  try {
    const nuevaLinea = new Linea(req.body);
    await nuevaLinea.save();
    res.status(201).json(nuevaLinea);
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          "Error al crear la línea. Verifique que el código no esté duplicado.",
      });
  }
};

// PUT - Actualizar línea por ID
exports.actualizarLinea = async (req, res) => {
  try {
    const linea = await Linea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!linea)
      return res
        .status(404)
        .json({ msg: "Línea de investigación no encontrada" });
    res.json(linea);
  } catch (error) {
    res.status(400).json({ error: "ID inválido o error al actualizar" });
  }
};

// DELETE - Eliminar línea por ID
exports.eliminarLinea = async (req, res) => {
  try {
    const linea = await Linea.findByIdAndDelete(req.params.id);
    if (!linea) return res.status(404).json({ msg: "Línea no encontrada" });
    res.json({ msg: "Línea eliminada exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "ID inválido o error al eliminar" });
  }
};
