// src/domain/repositories/MarkingRepository.js
class MarkingRepository {
    constructor({ MarkingModel }) {
      this.MarkingModel = MarkingModel;
    }
  
    async create(markingData) {
      return await this.MarkingModel.create(markingData);
    }
  
    async getAllByUserId(userId) {
      return this.MarkingModel.findAll({ where: { userId } });
    }
  }
  
  module.exports = MarkingRepository;
      