const jwt = require('jsonwebtoken');
const { pool } = require('../config');
const { AppError } = require('./error-handler');

// Interface para o payload do JWT
/**
 * @typedef {Object} JwtPayload
 * @property {string} userId - ID do usuário
 * @property {string} role - Papel do usuário (MERCHANT, EMPLOYEE, PARTNER)
 */

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, 'No token provided');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new AppError(401, 'No token provided');
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    );

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    const user = rows[0];

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};

module.exports = authMiddleware; 