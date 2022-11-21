const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        value: {
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    })
}