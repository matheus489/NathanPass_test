const express = require('express');
const cors = require('cors');
const { config } = require('./config');
const authRouter = require('./routes/auth');
const merchantRouter = require('./routes/merchant');
const partnerRouter = require('./routes/partner');
const employeeRouter = require('./routes/employee');
const { errorHandler } = require('./middlewares/error-handler');

const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRouter);
app.use('/api/merchant', merchantRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/employee', employeeRouter);

// Tratamento de erros
app.use(errorHandler);

// Iniciar servidor
const port = config.server.port;
app.listen(port, () => {
  console.log(`Servidor rodando em modo ${config.server.nodeEnv} na porta ${port}`);
}); 