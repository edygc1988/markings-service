const { Sequelize } = require('sequelize');
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const MarkingModel = require('./models/MarkingModel')(sequelize);

sequelize.sync();

module.exports = { sequelize, MarkingModel };
