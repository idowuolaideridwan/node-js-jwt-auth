const { authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");

const API_URL = "/api/v1"

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    API_URL+"/payment/aggregator",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.paymentAggregator
  );

  app.get(
    API_URL+"/payment/appointmentList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.appointmentList
  );

  app.get(
    API_URL+"/payment/applicantList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.applicantList
  );

  app.get(
    API_URL+"/payment/refundList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.refundList
  );

  app.put(
    API_URL+"/payment/refund",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.refund
  );

};
