const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
    host:"localhost",
    dialect: "postgres",
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
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
