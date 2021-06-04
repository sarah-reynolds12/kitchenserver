require("dotenv").config();
const Express = require("express");
const db = require("./db");

const app = Express();

//const middlewares = require("./middleware");

const controllers = require("./controllers");

app.use(Express.json());
app.use(require("./middleware/cors"));
app.use("/user", controllers.User);
app.use("/fooditem", controllers.FoodItem);
app.use("/kitchen", controllers.Kitchen);

db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on port ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
// app.listen(3000, () => {
//     console.log(`[server]: App is listening on localhost: 3000`);
// })