
const { publishMarkingEvent } = require('../../events/kafkaProducer');

const MarkingRepository = require('../../../domain/repositories/MarkingRepository');
const{ MarkingModel } = require('../../database/sequelize')
const RegisterMarking = require('../../../application/use-cases/RegisterMarking');

const markingRepository = new  MarkingRepository({ MarkingModel });

exports.registerMarking = async (req, res) => {
  try {
    const markingData = req.body;
    markingData.userId = req.userId;
    const registerMarking = new RegisterMarking(markingRepository);

    const marking = await registerMarking.execute(markingData);

    //Publica eventos en apache kafka
    await publishMarkingEvent(marking);

    res.status(200).json({"respose": "DATOS GRABADOS CORRECTAMENTE", "error": ""});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
    