// src/domain/entities/Marking.js
class Marking {
    constructor({ userId, date, type, location, createdBy, updatedBy }) {
      this.userId = userId;
      this.date = date;
      this.type = type;
      this.location = location;
      this.createdBy = createdBy;
      this.updatedBy = updatedBy;
    }
  }
  
  module.exports = Marking;
  