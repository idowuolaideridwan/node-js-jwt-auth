module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("derasoft_users", {
    member_id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return User;
};
