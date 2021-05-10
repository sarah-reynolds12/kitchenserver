const User = require("./user");
const FoodItem = require("./fooditem");
const Kitchen = require("./kitchen");

User.hasOne(Kitchen);
Kitchen.belongsTo(User);

User.hasMany(FoodItem);
FoodItem.belongsTo(User);

module.exports = {
    User,
    FoodItem,
    Kitchen,
};
