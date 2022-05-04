const db = require("../models");
const helper = require("../config/helper.config");
const LocationUser = db.location_user;
const Location = db.location;

const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');

var bcrypt = require("bcryptjs");

exports.validate = (method) => {
  switch (method) {
    case 'createLocationUser': {
     return [ 
        body('name', 'City, Country cannot be empty').exists(),
        body('agency', 'Agency Name cannot be empty').exists(),
        body('address', 'Location Address cannot be empty').exists(),
        body('firstname', 'Location Admin Firstname cannot be empty').exists(),
        body('lastname', 'Location Admin Lastname cannot be empty').exists(),
        body('password','Password Field cannot be empty').exists(),
        body('email', 'Invalid email Address Provided').isEmail()
       ]   
    };
    case 'updateLocationUser': {
        return [ 
           body('name', 'City, Country cannot be empty').optional(),
           body('agency', 'Agency Name cannot be empty').optional(),
           body('address', 'Location Address cannot be empty').optional(),
           body('firstname', 'Location Admin Firstname cannot be empty').optional(),
           body('lastname', 'Location Admin Firstname cannot be empty').optional(),
           body('password','Password Field cannot be empty').optional(),
           body('email', 'Invalid email Address Provided').optional().isEmail(),
           body('id', 'ID must be provided').exists()
          ]   
       };
    case 'disableLocationUser': {
      return [ 
        body('id', 'Location ID cannot be empty').exists()
        ]   
     }
  }
};

exports.createLocationUser = async (req,res, next) => {

    try 
    {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  
      if (!errors.isEmpty()) 
      {
        res.status(helper.UNPROCESSABLE_ENTITY).json({status: helper.UNPROCESSABLE_ENTITY, message: errors.array(), data: null });
        return;
      }
  
      const { name, agency, address, firstname, lastname, password , email } = req.body
  
        if (errors.isEmpty()) 
        {
         const location = await Location.create(
            { 
                name : name,
                agency : agency,
                address : address
             }
          );
      
          LocationUser.create(
                { 
                    location_id : location.id,
                    firstname : firstname,
                    lastname : lastname,
                    password : bcrypt.hashSync(password, 8),
                    email: email
                 }
            )
        
           return res.status(helper.MSG_CREATED).send({status: helper.MSG_CREATED,message: "User Information Successfully Updated",data: null});
        }
        else
        {
          return res.status(helper.NOT_FOUND).send({status: helper.NOT_FOUND, message: "Sorry, New Account cannot be created now. Contact Management" , data: null});
        }
    }
        catch (err)
        {
            return next(err);
        }
  };

exports.allUser = (req,res) => {

Location.findAll({
    attributes: ['id', 'name', 'agency' , 'address', 'status']
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
  
      const { id, name, agency, address, firstname, lastname, password , email } = req.body

      const result = await Location.findOne(
        {
        where: {
          id: id
        }
        }
        )
  
  
        if (result) 
        {
         Location.update(
            { 
                name : name,
                agency : agency,
                address : address
             },
             {
              where:
              {
                id: id
              }
          }
          );
      
          LocationUser.update(
                { 
                    firstname : firstname,
                    lastname : lastname,
                    password : bcrypt.hashSync(password, 8),
                    email: email
                 },
                 {
                  where:
                  {
                    location_id: id
                  }
              }
            )
        
           return res.status(helper.MSG_CREATED).send({status: helper.MSG_CREATED,message: "User Information Successfully Updated",data: null});
        }
        else
        {
          return res.status(helper.NOT_FOUND).send({status: helper.NOT_FOUND, message: "Provided Location ID doesnot exist" , data: null});
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

    const { id } = req.body

    const result = await Location.findOne(
      {
      where: {
        id: id
      }
      }
      )

      if (result) 
      {
          Location.update(
              { status : 1}, 
              {
                  where:
                  {
                    id: id
                  }
              }
          )
         return res.status(helper.MSG_CREATED).send({status: helper.MSG_CREATED,message: "Location User Account Successfully Disabled",data: null});
      }
      else
      {
        return res.status(helper.NOT_FOUND).send({status: helper.NOT_FOUND, message: "No Location Found" , data: null});
      }
  }
      catch (err)
      {
          return next(err);
      }
};

