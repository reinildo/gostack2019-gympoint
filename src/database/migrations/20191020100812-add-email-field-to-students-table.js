module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('students', 'email');
  },
};
