const db = require("../models");
const helper = require("../config/helper.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'updateUser': {
     return [ 
        body('name', 'Name cannot be empty').optional(),
        body('username').optional(),
        body('email', 'Invalid email').optional().exists().isEmail(),
        body('member_id', 'Member ID cannot be empty').exists()
       ]   
    };
    case 'disableUser': {
      return [ 
        body('member_id', 'Member ID cannot be empty').exists()
        ]   
     }
  }
};

exports.allUser = (req,res) => {

  User.findAll({
    attributes: ['member_id', 'name' , 'username', 'email','status','createdAt']
  })
  .then(result => {
      if (result) 
      {
         return res.status(200).send({status: 200,message: "List of Admin User Successfully Retrieved",data: result});
      }
      else
      {
          return res.status(200).send({status: 200, message: "No Admin UserFound" , data: null});
      }
})
};

exports.updateUser = async (req,res, next) => {

  try 
  {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) 
    {
      res.status(helper.UNPROCESSABLE_ENTITY).json({status: helper.UNPROCESSABLE_ENTITY, message: errors.array(), data: null });
      return;
    }

    const { name, username, email , member_id } = req.body

    const result = await User.findOne(
      {
      where: {
        member_id: member_id
      }
      }
      )

      if (result) 
      {
          User.update(
              { name : name,
                username: username,
                email: email,
               }, 
              {
                  where:
                  {
                    member_id: member_id
                  }
                }
          )
         return res.status(helper.MSG_CREATED).send({status: helper.MSG_CREATED,message: "User Information Successfully Updated",data: null});
      }
      else
      {
        return res.status(helper.NOT_FOUND).send({status: helper.NOT_FOUND, message: "No User Found" , data: null});
      }
  }
      catch (err)
      {
          return next(err);
      }
};


exports.disableUser = async (req,res, next) => {

  try 
  {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) 
    {
      res.status(helper.UNPROCESSABLE_ENTITY).json({status: helper.UNPROCESSABLE_ENTITY, message: errors.array(), data: null });
      return;
    }

    const { member_id } = req.body

    const result = await User.findOne(
      {
      where: {
        member_id: member_id
      }
      }
      )

      if (result) 
      {
          User.update(
              { status : 1}, 
              {
                  where:
                  {
                    member_id: member_id
                  }
                }
          )
         return res.status(helper.MSG_CREATED).send({status: helper.MSG_CREATED,message: "User Account Successfully Disabled",data: null});
      }
      else
      {
        return res.status(helper.NOT_FOUND).send({status: helper.NOT_FOUND, message: "No User Found" , data: null});
      }
  }
      catch (err)
      {
          return next(err);
      }
};

