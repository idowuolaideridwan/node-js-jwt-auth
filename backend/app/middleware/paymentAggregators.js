const db = require("../models");
const Payment = db.payment;
const Op = db.Sequelize.Op;

dailyAggregators = async (res, next) => { 
    
 const dailyAggregators =  Payment.sum('info_payment',
{
   where: 
    { 
        info_datetime: db.Sequelize.literal('DATE(appointments.info_datetime) = CURDATE()'),
        refund: 0,

        payment_reference:
            {
                [Op.ne]: null
            }
        
    },
    
});


const weeklyAggregators = 100;
const monthlyAggregators = 101;
const totalRevenueAggregators = 102;
const totalRefundAggregators=103;

const paymentAggregators = {
    dailyAggregators: 100,
    weeklyAggregators: weeklyAggregators,
    monthlyAggregators: monthlyAggregators,
    totalRevenueAggregators: totalRevenueAggregators,
    totalRefundAggregators: totalRefundAggregators
};

module.exports = paymentAggregators;
}
