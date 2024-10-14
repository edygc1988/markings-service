// src/infrastructure/database/models/MarcacionModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MarcacionModel = sequelize.define('Marcacion',{
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      usuarioId: { type: DataTypes.INTEGER, allowNull: false },
      empleadoId: { type: DataTypes.INTEGER, allowNull: false },
      fecha: { type: DataTypes.DATE, allowNull: false },
      tipo: { type: DataTypes.ENUM("entry", "exit", "salidacomida", "entradacomida"), allowNull: false },
      localizacion: { type: DataTypes.STRING },
      empresaId: { type: DataTypes.INTEGER },
      personaId: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.STRING },
      updatedBy: { type: DataTypes.STRING },
      // Campos de auditoría
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "Marcacion",
      timestamps: true, // Añade automáticamente createdAt y updatedAt
      paranoid: true, // Añade automáticamente deletedAt para soft delete
    }
  );

  return MarcacionModel;
};
