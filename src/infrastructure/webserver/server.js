const express = require('express');
const { sequelize } = require('../database/sequelize');
const markingRoutes = require('./routes/markingRoutes');
const { startProducer } = require('../events/kafkaProducer');

const app = express();

app.use(express.json());
app.use('/api/v1/marking', markingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await sequelize.authenticate();
  console.log('Base de datos conectada');
  await startProducer();
});
