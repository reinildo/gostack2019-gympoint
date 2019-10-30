import { format, parseISO, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan } = data;

    const endDate = addMonths(parseISO(plan.createdAt), plan.duration);

    console.log(endDate);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada!',
      template: 'registration',
      context: {
        student,
        plan,
        start_date: format(parseISO(plan.createdAt), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
        end_date: format(endDate, "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
      },
    });
  }
}

export default new RegistrationMail();
