const {DataTypes} = require("sequelize");
const db = require("../db");

const FoodItem = db.define("fooditem", {
    fooditem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemamount: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    foodcategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brandname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    kitchenarea: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kitchenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

module.exports = FoodItem;