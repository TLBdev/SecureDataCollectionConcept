const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./userModel.js");
const restricted = require("../authConfig/restrictMW");
const adminmw = require('../authConfig/adminRestrictedMW')
const { jwtSecret } = require("../authConfig/secrets");
const jwt = require("jsonwebtoken");

router.get("/", restricted, (req, res) => {


    Users.findById(req.user.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "can't find user profile" });
        });


});

router.get('/all', (req, res) => {
    Users.find()
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Can't get user." });
        });
})

router.get("/:id", adminmw, (req, res) => {

    Users.findById(req.user.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Can't get user." });
        });

});

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                res.status(200).json({ token });
            } else {
                console.log(user)
                res.status(401).json({ message: "Username or Password invalid" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

router.put("/", restricted, (req, res) => {

    Users.update(req.user.id, req.body)
        .then(updated => res.status(200).json(updated))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "can't update user" });
        });
});

router.delete("/", restricted, (req, res) => {
    Users.remove(req.user.id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "can't delete user" });
        });
});

function signToken(user) {

    const payload = {
        id: user.id,
        username: user.username
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;