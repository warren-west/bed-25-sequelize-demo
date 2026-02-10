const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const DriverCircuit = sequelize.define('driver_circuits', {
        position: DataTypes.INTEGER
    }, {
        timestamps: false
    })
    
    return DriverCircuit
} 