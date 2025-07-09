const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAdmin } = require("./verifyToken");

// admin get all users
router.get("/getAllUser", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json("No users found");
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(200).json(error);
    }
})

// admin block user
router.put("/updateUserStatus/:id", verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params;
    const { isBlocked } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json("user not found");
        }
        user.isBlocked = isBlocked;
        const updatedUser = await user.save();
        return res.status(200).json({ message: "user status updated", user: updatedUser, status: "success" });
    } catch (error) {
        return res.status(200).json(error);
    }
})

module.exports = router;