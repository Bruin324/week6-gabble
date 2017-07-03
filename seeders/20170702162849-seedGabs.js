'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return (
      queryInterface.bulkInsert('gabs', [{
        description: 'This is the first Gab.',
        timestamp: new Date(),
        author: 'Admin',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        description: 'This is the second Gab.',
        timestamp: new Date(),
        author: 'Bruin',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}))
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
