const { Sequelize } = require('sequelize');
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const MarcacionModel = require('./models/MarcacionModel')(sequelize);
const EmpleadoModel = require('./models/empleadoModel')(sequelize);

MarcacionModel.associate({ 
    Empleado: EmpleadoModel // Asocia las marcaciones con el empleado
  });

sequelize.sync({alter: true});

module.exports = { sequelize, MarcacionModel, EmpleadoModel };
