
const { publishMarcacionEvent } = require('../../events/kafkaProducer');

const MarcacionRepository = require('../../../domain/repositories/MarcacionRepository');
const{ MarcacionModel } = require('../../database/sequelize')
const RegisterMarcacion = require('../../../application/use-cases/marcacionUseCase');

const marcacionRepository = new  MarcacionRepository({ MarcacionModel });
const registerMarcacion = new RegisterMarcacion(marcacionRepository);

exports.registerMarcacion = async (req, res) => {
  try {
    const marcacionData = req.body;
    marcacionData.usuarioId = req.usuarioId;

    const lastMarcacion = await registerMarcacion.getLastMarcacion(marcacionData.usuarioId, marcacionData.fecha);

    let type;
    if (!lastMarcacion) {
      // Si no hay marcaciones, la primera debe ser "entry"
      type = 'entry';
    } else {
      // Lógica para ciclo de marcaciones
      switch (lastMarcacion.tipo) {
        case 'entry':
          type = 'salidacomida'; // Después de "entry" sigue "salidacomida"
          break;
        case 'salidacomida':
          type = 'entradacomida'; // Después de "salidacomida" sigue "entradacomida"
          break;
        case 'entradacomida':
          type = 'exit'; // Después de "entradacomida" sigue "exit"
          break;
        case 'exit':
          type = 'entry'; // Después de "exit" sigue "entry" (nuevo ciclo)
          break;
        default:
          type = 'entry'; // Default a entrada
      }
    }

    marcacionData.tipo = type;

    const marcacion = await registerMarcacion.execute(marcacionData);

    //Publica eventos en apache kafka
    await publishMarcacionEvent(marcacionData);

    res.status(201).json(marcacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listMarcacion = async(req,res) => {
  try {
    const usuarioId = req.params.id;
    
    const lastMarcacion = await registerMarcacion.getMarcacionByUserId(usuarioId);
    
    res.status(200).json(lastMarcacion);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

exports.listMarcacionByEmpleado = async(req,res) => {
  try {
    const empleadoId = req.params.id;
    
    const lastMarcacion = await registerMarcacion.getMarcacionByEmpleadoId(empleadoId);
    
    res.status(200).json(lastMarcacion);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

exports.listMarcacionByEmpresa = async(req,res) => {
  try {
    const empresaId = req.params.id;
    
    const lastMarcacion = await registerMarcacion.getMarcacionByEmpresaId(empresaId);
    
    res.status(200).json(lastMarcacion);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

exports.listMarcacionByPersona = async(req,res) => {
  try {
    const personaId = req.params.id;
    
    const lastMarcacion = await registerMarcacion.getMarcacionByPersonaId(personaId);
    
    res.status(200).json(lastMarcacion);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};