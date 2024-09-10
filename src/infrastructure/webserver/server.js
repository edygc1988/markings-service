const express = require('express');
const sequelize = require('../database/sequelize');
const markingRoutes = require('./routes/markingRoutes');

const app = express();

app.use(express.json());
app.use('/api', markingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
