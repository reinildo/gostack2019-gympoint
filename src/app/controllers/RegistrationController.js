import * as yup from 'yup';
import { Op } from 'sequelize';
import { addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    /**
     * only active registry
     */
    const registrations = await Registration.findAll({
      where: {
        end_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
      start_date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, student_id, start_date } = req.body;

    /**
     * check if student exists
     */
    const studentExists = await Student.findByPk(student_id);
    if (!studentExists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const plan = await Plan.findByPk(plan_id);
    /**
     * check if plan exists
     */
    const planExists = await Student.findByPk(student_id);
    if (!planExists) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id,
      plan_id,
      price,
      start_date: parseISO(start_date),
      end_date,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number(),
      plan_id: yup.number(),
      start_date: yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const regToEdit = await Registration.findByPk(Number(req.params.id));
    const { student_id, plan_id, start_date } = req.body;

    if (student_id) {
      /**
       * if an student id was passed, check if student exists
       */
      const studentExists = await Student.findByPk(student_id);
      if (!studentExists) {
        return res.status(404).json({ error: 'Student not found' });
      }
    }

    if (plan_id) {
      /**
       * if an plan id was passe, check if it exists
       */
      const planExists = await Plan.findByPk(plan_id);
      if (!planExists) {
        return res.status(404).json({ error: 'Plan not found' });
      }
    }

    let end_date;
    let price;
    const plan = await Plan.findByPk(regToEdit.plan_id);

    if (start_date) {
      end_date = addMonths(parseISO(start_date), plan.duration);
      price = plan.price * plan.duration;
    }

    const registration = await regToEdit.update({
      student_id,
      plan_id,
      price,
      start_date: parseISO(start_date),
      end_date,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    await registration.destroy();
    return res.json();
  }
}

export default new RegistrationController();
