// src/application/use-cases/RegistrarMarcacion.js
class RegistrarEmpleado {
    constructor(empleadoRepository) {
      this.empleadoRepository = empleadoRepository;
    }  

    async execute(data) {

      // Aquí podrías almacenar temporalmente las marcaciones para calcular el rol al final del mes
      console.log('Procesando empleado:', data);

      const empleadoData = data.empleado;
      const empleado = {
        id: empleadoData.id,
        identificacion: empleadoData.identificacion,
        nombre: empleadoData.nombre,
        correo: empleadoData.correo
      };
      
      // Registrar al empleado
      await this.empleadoRepository.save(empleado);

    }

    async getEmpleadoByUserId(userId) {
      return await this.empleadoRepository.getEmpleadoByUserId(userId);
    }
}

module.exports = RegistrarEmpleado;