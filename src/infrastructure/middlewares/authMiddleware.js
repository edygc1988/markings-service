// src/infrastructure/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const RabbitMQPublisher = require('../../infrastructure/messaging/rabbitmqPublisher');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Publicar mensaje a RabbitMQ
    //const rabbitMQPublisher = new RabbitMQPublisher();
    //await rabbitMQPublisher.publish({ correo: 'edygc1988@gmail.com', contraseña: '1234567890', token:  token });
    //console.log(data);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error + ' Not authorized' });
  }
};
