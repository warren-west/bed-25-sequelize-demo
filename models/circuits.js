const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Circuit = sequelize.define('circuits', {
        circuitName: DataTypes.STRING
    }, {
        timestamps: false
    })

    return Circuit
}