const MarkingRepository = require('../../../domain/repositories/MarkingRepository');
const{ MarkingModel } = require('../../database/sequelize')
const RegisterMarking = require('../../../application/use-cases/RegisterMarking');

const markingRepository = new  MarkingRepository({ MarkingModel });

exports.registerMarking = async (req, res) => {
  const { userId, date, type, location, createdBy } = req.body;
  const registerMarking = new RegisterMarking(markingRepository);

  try {
    const marking = await registerMarking.execute({ userId, date, type, location, createdBy });

    res.status(201).json(marking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
    