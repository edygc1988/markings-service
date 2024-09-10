// src/infrastructure/database/models/MarkingModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MarkingModel = sequelize.define('Marking',{
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      type: { type: DataTypes.ENUM("entry", "exit"), allowNull: false },
      location: { type: DataTypes.STRING },
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
      tableName: "Marking",
      timestamps: true, // Añade automáticamente createdAt y updatedAt
      paranoid: true, // Añade automáticamente deletedAt para soft delete
    }
  );

  return MarkingModel;
};
