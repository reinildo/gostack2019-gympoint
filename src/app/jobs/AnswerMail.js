import { format, parseISO, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { answer } = data;

    console.log(answer);
    await Mail.sendMail({
      to: `${answer.Student.name} <${answer.Student.email}>`,
      subject: 'Sua pergunta foi respondida!',
      template: 'answer',
      context: {
        answer: answer.answer,
        student: answer.Student,
        question_date: format(
          parseISO(answer.createdAt),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
