const {DataTypes} = require("sequelize");
const db = require("../db");

const Kitchen = db.define("kitchen", {
    kitchenarea: {
        type: DataTypes.STRING(100),
        allowNull: false,  
    },    
    kitchenarea: {
        type: DataTypes.STRING(100),
        allowNull: true,  
    }, 
    kitchenarea: {
        type: DataTypes.STRING(100),
        allowNull: true,  
    }, 
    kitchenarea: {
        type: DataTypes.STRING(100),
        allowNull: true,  
    }, 
});

module.exports = Kitchen;