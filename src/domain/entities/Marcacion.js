// src/domain/entities/Marcacion.js
class Marcacion {
  constructor({ usuarioId, empleadoId, date, type, location, empresaId, personaId, createdBy, updatedBy }) {
    this.usuarioId = usuarioId;
    this.empleadoId = empleadoId;
    this.date = date;
    this.type = type;
    this.empresaId = empresaId;
    this.personaId = personaId;
    this.location = location;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getUsuarioId() {
    return this.usuarioId;
  }

  getEmpleadoId() {
    return this.empleadoId;
  }

  getDate() {
    return this.date;
  }

  getType() {
    return this.type;
  }

  getLocation() {
    return this.location;
  }

  getEmpresaId() {
    return this.empresaId;
  }

  getPersonaId() {
    return this.personaId;
  }

  getCreatedBy() {
    return this.createdBy;
  }

  getUpdatedBy() {
    return this.updatedBy;
  }
}

  
  module.exports = Marcacion;
  