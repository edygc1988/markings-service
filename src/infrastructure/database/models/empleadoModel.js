const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoModel = sequelize.define(
    'Empleado',
    {
      identificacion: { type: DataTypes.STRING, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      tableName: 'Empleado',
      timestamps: true,
      paranoid: true,
    }
  );

  return EmpleadoModel;
};
