const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// signup
router.post("/signup", async (req, res) => {
    const userData = new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin || false,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try {
        const getUser = await userData.save();
        res.status(201).json(getUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json("user not found");
        }
        const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const orgPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
        if (orgPassword !== req.body.password) {
            return res.status(400).json("invalid password");
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            isSuperAdmin: user.isSuperAdmin
        }, process.env.JWT_SEC, { expiresIn: "3d" })

        const { password, ...others } = user.toObject();
        return res.status(200).json({ ...others, accessToken })
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;