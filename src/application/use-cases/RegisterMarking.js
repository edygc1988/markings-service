// src/application/use-cases/RegisterMarking.js
class RegisterMarking {
    constructor(markingRepository) {
      this.markingRepository = markingRepository;
    }
  
    async execute(markingData) {
      return await this.markingRepository.create(markingData);
    }
  }
  
  module.exports = RegisterMarking;
  