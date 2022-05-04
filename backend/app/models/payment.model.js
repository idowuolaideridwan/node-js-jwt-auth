module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("appointments", {
    paymentRetrievalReference: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    app_ref: {
        type: Sequelize.STRING
      },  
      info_payment: {
        type: Sequelize.STRING
      },  
      info_datetime: {
        type: Sequelize.STRING
      },  
      paymentDate:
      {
        type: Sequelize.STRING
      },  
      refund: {
        type: Sequelize.STRING
      },  
      payment_reference: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
  });
  
    return Payment;
  };
  