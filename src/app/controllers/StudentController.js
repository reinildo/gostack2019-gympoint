import * as yup from 'yup';
import Student from '../models/Student';

class StudentController {
  /**
   * index
   */
  async index(req, res) {
    const students = await Student.findAll();

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

    const studentExists = await Student.findOne({ email: req.body.email });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exist' });
    }

    const student = await Student.create(req.body);

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

    const student = await Student.findByPk(req.params.id);
    const { email } = req.body;

    if (email) {
      if (student.email !== email) {
        const studentExists = await Student.findOne({ where: { email } });
        if (studentExists) {
          return res.status(400).json({ error: 'Student already exists.' });
        }
      }
    }

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
