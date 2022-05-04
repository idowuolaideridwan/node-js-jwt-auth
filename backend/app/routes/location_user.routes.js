const { authJwt , verifySignUp } = require("../middleware");
const controller = require("../controllers/location_user.controller");

const API_URL = "/api/v1"

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    API_URL+"/location/createLocationUser", 
    [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateAgencyOrEmail],
    controller.validate('createLocationUser'),
    controller.createLocationUser
  );

  app.get(
    API_URL+"/location/allUser", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allUser
  );

  app.put(
    API_URL+"/location/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.validate('updateLocationUser'),
    controller.updateUser
  );

  app.put(
    API_URL+"/location/disable",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.validate('disableLocationUser'),
    controller.disableUser
  );

};
