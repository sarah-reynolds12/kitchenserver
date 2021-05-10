const { Sequelize } = require("sequelize");

const db = new Sequelize("kitchen-inventory", "postgres", "password", {
    host:"localhost",
    dialect: "postgres",
});

// db.authenticate().then(
//     function() {
//         console.log('Connected to kitchen-inventory postgres database');
//     },
//     function(err) {
//         console.log(err)
//     }
// )
module.exports = db; 
