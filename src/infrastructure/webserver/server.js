const express = require('express');
const cors = require('cors');  // Importa el paquete CORS

const { sequelize } = require('../database/sequelize');
const marcacionRoutes = require('./routes/marcacionRoutes');
const { startProducer } = require('../events/kafkaProducer');
const metricsRoutes = require('./routes/metricasRoutes');
const { collectDefaultMetrics } = require('prom-client');

const app = express();
// Configura la recolección de métricas por defecto
collectDefaultMetrics();

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(express.json());
app.use('/api/v1/marking', marcacionRoutes);
app.use('/', metricsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await sequelize.authenticate();
  console.log('Base de datos conectada');
  await startProducer();
});
