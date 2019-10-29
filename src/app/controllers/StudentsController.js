import * as yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  /**
   * index
   */
  async index(req, res) {
    const students = await Students.findAll();

    return res.json(students);
  }

  /**
   * store
   */
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      birth: yup.date().required(),
      height: yup.number().required(),
      weight: yup.number().required(),
      email: yup
        .string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Students.create(req.body);

    return res.json({ student });
  }

  /**
   * update
   */
  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      birth: yup.date(),
      weight: yup.number(),
      height: yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Students.findByPk(req.params.id);
    const { email } = req.body;

    if (student.email !== email) {
      const studentExists = await Students.findOne({ where: { email } });
      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentsController();
