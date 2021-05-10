const { Router } = require("express");
const { FoodItem } = require("../models");
const validateSession = require("../middleware/validate-session");
const { route } = require("./usercontroller");
const router = Router();

//CREATE FOOD ITEM//

router.post("/create", validateSession, function(req, res) {
    console.log(req.user.id);
    const foodEntry = {
        fooditem: req.body.fooditem,
        itemamount: req.body.itemamount,
        foodcategory: req.body.foodcategory,
        brandname: req.body.brandname,
        kitchenarea: req.body.kitchenarea,
        //photo: req.body.photo,
        kitchenId: req.user.id,
        userId: req.user.id,
    };
    FoodItem.create(foodEntry)
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//GET ALL FOOD ITEMS- Whole Kitchen//

router.get("/get", validateSession, function(req, res) {
    const query = {
        where: {userId: req.user.id},
        include: "user",
    };

    FoodItem.findAll(query)
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//GET FOOD BY CATEGORY//
router.get("/:foodcategory", validateSession, function(req, res) {
    let foodcategory = req.params.foodcategory;

    FoodItem.findAll({
        where: {foodcategory: foodcategory} })
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//GET FOOD BY KITCHEN AREA//
router.get("/:kitchenarea", validateSession, function(req, res) {
    let kitchenarea = req.params.kitchenarea;

    FoodItem.findAll({
        where: {kitchenarea: kitchenarea} })
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//GET FOOD BY ITEM AMOUNT//
router.get("/:itemamount", validateSession, function(req, res) {
    let itemamount = req.params.itemamount;

    FoodItem.findAll({
        where: {itemamount: itemamount} })
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//UPDATE FOOD ITEM

router.put("/update/:foodId", validateSession, function(req, res) {
    const updateFoodEntry = {
        fooditem: req.body.fooditem,
        itemamount: req.body.itemamount,
        foodcategory: req.body.foodcategory,
        brandname: req.body.brandname,
        photo: req.body.photo,
        kitchenId: req.user.id,
        userId: req.user.id,
    };

    const query = {where: { id: req.params.foodId, userId: req.user.id}};

    FoodItem.update(updateFoodEntry, query) 
    .then((food) => res.status(200).json(food))
    .catch((err) => res.status(500).json({ error: err}));
});

//DELETE FOOD ITEM//

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id}};

    FoodItem.destroy(query)
    .then(() => res.status(200).json({message: "Food Item Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;