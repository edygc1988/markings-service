// src/domain/repositories/MarcacionRepository.js
const { Op } = require('sequelize');

class MarcacionRepository {
    constructor({ MarcacionModel }) {
      this.MarcacionModel = MarcacionModel;
    }
  
    async create(marcacionData) {
      return await this.MarcacionModel.create(marcacionData);
    }

    async getLastMarcacion(usuarioId,date){
      const today = new Date(date);
      today.setHours(0, 0, 0, 0); // Resetear a las 00:00:00
  
      // Buscar la última marcación del usuario para el día actual
      const lastMarcacion = await this.MarcacionModel.findOne({
        where: {
          usuarioId,
          fecha: {
            [Op.gte]: today, // Marcaciones del día actual
          },
        },
        order: [['fecha', 'DESC']],
      });

      return lastMarcacion;
    }
  
    async getMarcacionByUserId(usuarioId) {
      return this.MarcacionModel.findAll({ where: { usuarioId: usuarioId } });
    }
  
    async getMarcacionByEmpleadoId(empleadoId) {
      return this.MarcacionModel.findAll({ where: { empleadoId: empleadoId } });
    }
  
    async getMarcacionByEmpresaId(empresaId) {
      return this.MarcacionModel.findAll({ where: { empresaId: empresaId } });
    }
  
    async getMarcacionByPersonaId(personaId) {
      return this.MarcacionModel.findAll({ where: { personaId: personaId } });
    }
  }
  
  module.exports = MarcacionRepository;
      