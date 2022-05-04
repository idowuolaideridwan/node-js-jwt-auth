const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

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
    API_URL+"/user/allUser", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allUser
  );

  app.put(
    API_URL+"/user/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.validate('updateUser'),
    controller.updateUser
  );

  app.put(
    API_URL+"/user/disable",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.validate('disableUser'),
    controller.disableUser
  );

};
