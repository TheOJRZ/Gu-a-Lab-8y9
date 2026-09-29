const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({ msg: 'Acceso denegado. No hay token' });
  }

  try {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Inyecta { userId: ... } en la petición
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};