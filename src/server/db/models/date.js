const Sequelize = require('sequelize')
const db = require('../db')

const DateTab = db.define('date', {
    dayOfWeek: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']]
        }
    },
    dayNum: {
        type: Sequelize.INTEGER
    },
    month: {
        type: Sequelize.STRING
    }
})

module.exports = DateTab