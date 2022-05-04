module.exports = (sequelize, Sequelize) => {
    const Slot = sequelize.define("slots", {
        id: {
        type: Sequelize.STRING,
        primaryKey: true
      },  
      slot_id: {
        type: Sequelize.STRING
      },  
      loc_id: {
        type: Sequelize.STRING
      },  
      date_slot: {
        type: Sequelize.STRING
      },  
      time_slot: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
  });
  
    return Slot;
  };
  