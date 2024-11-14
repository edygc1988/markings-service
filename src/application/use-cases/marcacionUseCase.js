// src/application/use-cases/RegisterMarcacion.js
class RegisterMarcacion {
    constructor(marcacionRepository) {
      this.marcacionRepository = marcacionRepository;
    }
  
    async execute(marcacionData) {
      return await this.marcacionRepository.create(marcacionData);
    }

    async getLastMarcacion(usuarioId,date){
      return await this.marcacionRepository.getLastMarcacion(usuarioId,date);
    }

    async getMarcacionByUserId(usuarioId){
      return await this.marcacionRepository.getMarcacionByUserId(usuarioId);
    }

    async getMarcacionByEmpleadoId(empleadoId){
      return await this.marcacionRepository.getMarcacionByEmpleadoId(empleadoId);
    }

    async getMarcacionByEmpresaId(empresaId){
      return await this.marcacionRepository.getMarcacionByEmpleadoId(empresaId);
    }

    async getMarcacionByPersonaId(personaId){
      return await this.marcacionRepository.getMarcacionByPersonaId(personaId);
    }

  }
  
  module.exports = RegisterMarcacion;
  