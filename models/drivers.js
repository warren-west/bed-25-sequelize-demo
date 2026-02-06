const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Driver = sequelize.define('drivers', {
        driverName: DataTypes.STRING,
        birthDate: DataTypes.DATE
    }, {
        timestamps: false
    })
    
    return Driver
} 