// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexão com banco
require('./config/conn');

// Importar rotas
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Todoist funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota não encontrada (deve ser a última)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});