module.exports = (sequelize, Sequelize) => {
    const aptUser = sequelize.define("apt_users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      }, 
      firstname: {
        type: Sequelize.STRING
      },  
      middlename: {
        type: Sequelize.STRING
      },  
      lastname: {
        type: Sequelize.STRING
      },  
      phone: {
        type: Sequelize.STRING
      },  
      email: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
  });
  
    return aptUser;
  };
  