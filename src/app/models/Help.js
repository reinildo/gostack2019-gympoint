import { Model, Sequelize } from 'sequelize';

class Help extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'help_orders',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

export default Help;
