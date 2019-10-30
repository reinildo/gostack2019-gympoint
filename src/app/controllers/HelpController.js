import * as yup from 'yup';

import Student from '../models/Student';
import Help from '../models/Help';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class HelpController {
  async index(req, res) {
    const helps = await Help.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(helps);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      question: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const help = await Help.create({
      question: req.body.question,
      student_id: req.params.id,
    });

    return res.json(help);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      answer: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails' });
    }

    const question = await Help.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const answer = await question.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    await Queue.add(AnswerMail.key, { answer });

    return res.json(answer);
  }
}

export default new HelpController();
