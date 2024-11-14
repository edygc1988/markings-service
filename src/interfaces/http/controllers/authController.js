const RabbitMQPublisher = require('../../infrastructure/messaging/rabbitmqPublisher');

exports.login = async (req, res) => {
  try {
    const { nombre, correo, contraseña, createdBy, roles } = req.body;
    const registrarUsuario = new RegistrarUsuario(usuarioRepository);
    const usuario = await registrarUsuario.execute({ nombre, correo, contraseña, createdBy });

    if (roles) {
      await usuarioRepository.asignarRoles(usuario, roles);
    } else {
      await usuarioRepository.asignarRoles(usuario, ['empleado']);
    }

    // Publicar mensaje a RabbitMQ
    //const rabbitMQPublisher = new RabbitMQPublisher();
    //await rabbitMQPublisher.publish({ usuarioId: usuario.id, nombre, correo, roles });

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
