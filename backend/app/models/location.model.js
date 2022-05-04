module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
      },  
      name: {
        type: Sequelize.STRING
      },  
      agency: {
        type: Sequelize.STRING
      },  
      address: {
        type: Sequelize.STRING
      },  
      status: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
  });
  
    return Location;
  };
  