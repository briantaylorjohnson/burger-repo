// This is the model for each burger in the database
// There are two user specified fields: name and devoured
// There three system managed fields: id, createdAt, and updatedAt

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    
    return Burger;
  };
  