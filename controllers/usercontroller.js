const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Router} = require("express");
const {User} = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();
router.get("/get", function(req, res){
    User.findAll({where: {id: 1 }, include:["kitcheninfo"] }) .then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

router.post("/create", function(req, res) {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrpyt.hashSync(req.body.password, 13),
        role: req.body.role
    })
    .then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24, });
        res.json({
            user: user, 
            message: "User Successfully Created",
            sessionToken: token,
            role: user.role,
        });
    })
    .catch(function (err) {
        res.status(500).json({error: err});
    });
});

router.post("/login", function(req, res) {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrpyt.compare(req.body.password, user.password, function (
                err, 
                matches
            ) {
                if (matches) {
                    let token = jwt.sign(
                        {id: user.id, email: user.email }, process.env.JWT_SECRET, 
                        {
                            expiresIn: 60 * 60 * 24,
                        }
                    );
                    res.status(200).json({
                        user: user, 
                        message: "User Successfully Logged In!",
                        sessionToken: token,
                        role: user.role,
                    });
                } else {
                    res.status(502).send({ error: "Login Failed"});
                }
            });
        } else {
            res.status(500).json({ error: "User does not exist"});
        }
    })
    .catch((err) => res.status(500).json({
        error: err }));
});

module.exports = router;