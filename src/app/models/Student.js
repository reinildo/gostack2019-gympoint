import Sequelize, { Model } from 'sequelize';
import { differenceInCalendarDays } from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        height: Sequelize.DECIMAL,
        weight: Sequelize.DECIMAL,
        birth: Sequelize.DATE,
        email: Sequelize.STRING,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.calculateAge();
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  calculateAge() {
    console.log(differenceInCalendarDays(new Date(), this.birth));
    return Math.floor(
      differenceInCalendarDays(new Date(), this.birth) / 365.25
    );
  }
}

export default Student;
