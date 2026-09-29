const bcrypt = require('bcryptjs'); // Corrección: requerido para compare()
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    user = new User({ nombre, email, password });
    await user.save();

    return res.status(201).json({ msg: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al registrar' });
  }
};

// Inicio de sesión y generación de JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al iniciar sesión' });
  }
};

// Tarea 2: Obtener perfil del usuario autenticado (sin exponer el hash)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del perfil' });
  }
};