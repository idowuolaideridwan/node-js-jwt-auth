const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      
      const result = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }

      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({status: 200, message: "User registered successfully!",data: result });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({status: 200, message: "User registered successfully!",data: result });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({status: 404, message: "User Not found.",data: null });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        const data = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        }
        res.status(200).send({status: 200, message: "Login Successful", data: data});
      });
    })
    .catch(err => {
      res.status(500).send({status: 500, message: err.message, data: null });
    });
};
