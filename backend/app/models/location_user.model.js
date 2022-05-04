module.exports = (sequelize, Sequelize) => {
    const LocationUser = sequelize.define("location_users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },  
      location_id: {
        type: Sequelize.STRING,
        foreignKey: true
      }, 
      firstname: {
        type: Sequelize.STRING
      },  
      lastname: {
        type: Sequelize.STRING
      },  
      email: {
        type: Sequelize.STRING
      },  
      password: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
  });
  
    return LocationUser;
  };
  