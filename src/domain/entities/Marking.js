// src/domain/entities/Marking.js
class Marking {
    constructor({ userId, date, type, location, idEmpresa, idPersona, createdBy, updatedBy }) {
      this.userId = userId;
      this.date = date;
      this.type = type;
      this.idEmpresa = idEmpresa;
      this.idPersona = idPersona;
      this.location = location;
      this.createdBy = createdBy;
      this.updatedBy = updatedBy;
    }
  }
  
  module.exports = Marking;
  