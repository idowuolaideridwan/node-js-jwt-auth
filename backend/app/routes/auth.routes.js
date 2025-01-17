const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

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
    API_URL+"/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(API_URL+"/auth/signin", controller.signin);
};
