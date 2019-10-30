import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;
    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(404).json({ error: 'Stdent not found' });
    }

    /**
     * counts checkins over the last 7 days
     */
    const daysPeriod = subDays(new Date(), 7);

    const checkinCount = await Checkin.count({
      where: {
        student_id: id,
        created_at: {
          [Op.gte]: daysPeriod,
        },
      },
    });

    if (checkinCount >= 5) {
      return res
        .status(403)
        .json({ error: 'You have reach the checkins limit' });
    }

    // return res.json(checkinCount);

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
