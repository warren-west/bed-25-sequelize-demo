const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Role = sequelize.define('roles', {
        description: DataTypes.STRING(10)
    }, {
        timestamps: false
    })

    return Role
}