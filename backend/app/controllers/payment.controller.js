const db = require("../models");
const Payment = db.payment;
const AptUser = db.apt_user;
const Location = db.location;
const Slot = db.slot;

const Op = db.Sequelize.Op;

exports.paymentAggregator = async (req,res) => {
  
  const dailyPayment = await Payment.sum('info_payment',
    {
       where: 
        { 
            info_datetime: db.Sequelize.literal('DATE(appointments.paymentDate) = CURDATE()'),
            refund: 0,

            payment_reference:
                {
                    [Op.ne]: null
                }
            
        },
        
    });

    const weeklyPayment = await Payment.sum('info_payment',
    {
       where: 
        { 
            info_datetime: db.Sequelize.literal('paymentDate > DATE_SUB(CURDATE(), INTERVAL 1 WEEK)'),
            refund: 0,

            payment_reference:
                {
                    [Op.ne]: null
                }
            
        },
        
    });

    const monthlyPayment = await Payment.sum('info_payment',
    {
       where: 
        { 
            info_datetime: db.Sequelize.literal('paymentDate > DATE_SUB(CURDATE(), INTERVAL 4 WEEK)'),
            refund: 0,

            payment_reference:
                {
                    [Op.ne]: null
                }
            
        },
        
    });

    
    const totalRevenue = await Payment.sum('info_payment',
    {
       where: 
        { 
            refund: 0,

            payment_reference:
                {
                    [Op.ne]: null
                }
            
        },
        
    });

    const totalRefund = await Payment.sum('info_payment',
    {
       where: 
        { 
            refund: 1,
        },
        
    });


        var result =
                 {
            'DailyRevenue' : dailyPayment,
            'WeeklyRevenue' : weeklyPayment,
            'MonthlyRevenue' : monthlyPayment,
            'TotalRevenue' : totalRevenue,
            'TotalRefund' : totalRefund
                 };
                 
    res.status(200).send({status: 200,message: "Payment Aggregator",data: result});
};


exports.appointmentList = (req,res) => {

    db.sequelize.query
    (
        `SELECT info_date,date_slot,app_ref,info_sname,info_fname,info_phone,info_email,name,info_payment,payment_reference 
FROM appointments AI 
INNER JOIN apt_users U ON AI.paymentRetrievalReference=U.id 
LEFT JOIN slots S ON S.id=AI.info_date 
LEFT JOIN locations L ON AI.info_center=L.id 
WHERE AI.info_payment!='' AND AI.refund=0 
ORDER BY AI.info_datetime DESC`,
{ type: db.Sequelize.QueryTypes.SELECT }
    )
    .then(result => {
        if (result.length>0) 
        {
           return res.status(200).send({status: 200,message: "Total List of Appointments",data: result});
        }
        else
        {
            return res.status(200).send({status: 200, message: "No Appointment Found" , data: null});
        }
})
};

exports.applicantList = (req,res) => {

    db.sequelize.query
    (`SELECT info_date,date_slot,app_ref,info_sname,info_fname,info_phone,info_email,name,info_payment,payment_reference 
    FROM appointments AI 
    INNER JOIN apt_users U ON AI.paymentRetrievalReference=U.id
        LEFT JOIN slots S ON S.id=AI.info_date
        LEFT JOIN locations L ON AI.info_center=L.id
        WHERE AI.info_payment!='' AND AI.refund=0 
        AND AI.payment_reference IS NOT NULL
        ORDER BY AI.info_datetime DESC`,
{ type: db.Sequelize.QueryTypes.SELECT }
    )
    .then(result => {
        if (result.length>0) 
        {
           return res.status(200).send({status: 200,message: "Total List of Applicants",data: result});
        }
        else
        {
            return res.status(200).send({status: 200, message: "No Appointment Found" , data: null});
        }
})
};

exports.refundList = (req,res) => {

    db.sequelize.query
    (`SELECT info_date,app_ref,info_sname,info_fname,info_phone,info_email,info_payment,payment_reference 
    FROM appointments AI 
    INNER JOIN apt_users U ON AI.paymentRetrievalReference=U.id
	WHERE AI.info_payment!='' AND AI.refund=1 ORDER BY AI.info_datetime DESC`,
{ type: db.Sequelize.QueryTypes.SELECT }
    )
    .then(result => {
        if (result.length>0) 
        {
           return res.status(200).send({status: 200,message: "Total Number of Refunds",data: result});
        }
        else
        {
            return res.status(200).send({status: 200, message: "No Refund Found" , data: null});
        }
})
};

exports.refund = (req,res) => {

    Payment.findOne({
        where: {
          app_ref: req.body.app_ref
        }
      })
    .then(result => {
        if (result) 
        {
            Payment.update(
                { refund: 1 }, {
                    where: {
                      app_ref: req.body.app_ref
                    }
                  }
            )
           return res.status(200).send({status: 200,message: "Refund Successfully Processed",data: null});
        }
        else
        {
            return res.status(200).send({status: 200, message: "No Refund Found" , data: null});
        }
})
};

