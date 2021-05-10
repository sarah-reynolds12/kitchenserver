const { Router } = require("express");
const { Kitchen } = require("../models");
const validateSession = require("../middleware/validate-session");
const { setRandomFallback } = require("bcryptjs");
const router = Router();

router.post("/test", function (req, res) {
    res.send("It worked");
});
router.post("/create", validateSession, function(req, res) {
    console.log(req.user.id);
    if (req.user.role != 'shopper') {
        res.json({message: "You are not the shopper!"})
    }
    const kitchenEntry = {
        kitchenarea1: req.body.kitchenarea1,
        kitchenarea2: req.body.kitchenarea2,
        kitchenarea3: req.body.kitchenarea3,
        kitchenarea4: req.body.kitchenarea4,
        userId: req.user.id,
    };
    Kitchen.create(kitchenEntry)
    .then((kitchen) => res.status(200).json(kitchen))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function(req, res) {
    const query = {
        where: {userId: req.user.id},
        include: "user",
    };

Kitchen.findOne(query)
.then((kitchen) => res.status(200).json(kitchen))
.catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;