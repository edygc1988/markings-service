const { Sequelize } = require('sequelize');
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const MarcacionModel = require('./models/MarcacionModel')(sequelize);

sequelize.sync();

module.exports = { sequelize, MarcacionModel };
