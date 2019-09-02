'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Burgers', [
    {
      name: "Double Coronary Bypass Burger",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Triple Coronary Bypass Burger",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Big Texas Bacon Burger",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Classic American Cheeseburger",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Gluten Free Black Bean Burger",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Burgers', null, {});
  }
};
