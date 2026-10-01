const Estudiante = require("../models/Estudiante");

// GET - Listar todos los estudiantes
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

// GET - Tarea 2: Obtener estudiante por ID con la línea poblada (.populate)
exports.obtenerEstudiantePorId = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id).populate(
      "lineaInvestigacion",
    ); // Puebla todos los datos de la línea relacionada

    if (!estudiante) {
      return res.status(404).json({ msg: "Estudiante no encontrado" });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(400).json({ error: "ID de estudiante no válido" });
  }
};

// POST - Crear estudiante (asociando opcionalmente el ObjectId de la línea)
exports.crearEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    await nuevoEstudiante.save();
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          "Error al registrar estudiante. Carnet duplicado o datos inválidos.",
      });
  }
};

// PUT - Actualizar estudiante
exports.actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!estudiante)
      return res.status(404).json({ msg: "Estudiante no encontrado" });
    res.json(estudiante);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar estudiante" });
  }
};

// DELETE - Eliminar estudiante
exports.eliminarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    if (!estudiante)
      return res.status(404).json({ msg: "Estudiante no encontrado" });
    res.json({ msg: "Estudiante eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar estudiante" });
  }
};
