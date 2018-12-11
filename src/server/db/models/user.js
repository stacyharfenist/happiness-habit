const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
})

module.exports = User