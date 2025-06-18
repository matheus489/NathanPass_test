const { ZodError } = require('zod');

// Classe de erro personalizada
class AppError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Middleware de tratamento de erros
const errorHandler = (err, req, res, next) => {
  // Erro operacional (erro esperado)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Erro de validação do Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors,
    });
  }

  // Erro não operacional (erro inesperado)
  console.error('Error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

module.exports = { AppError, errorHandler }; 