const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Team = sequelize.define('teams', {
        // IDs (PKs) can either be left for Sequelize to create with defaults
        // or they can be created explicitly by us
        teamName: DataTypes.STRING
    }, {
        timestamps: false // do not create the columns for "createdAt" and "updatedAt"
    })

    return Team
}

