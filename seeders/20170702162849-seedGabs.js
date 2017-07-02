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
        numLikes: 0,
        author: 'Admin',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        description: 'This is the second Gab.',
        numLikes: 0,
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
