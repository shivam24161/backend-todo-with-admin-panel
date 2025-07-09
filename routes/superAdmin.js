const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndSuperAdmin } = require("./verifyToken");

// admin block user
router.delete("/deleteUser/:id", verifyTokenAndSuperAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json("user not found");
        }
        return res.status(200).json({
            success: true,
            message: "user deleted successfullyu"
        });
    } catch (error) {
        return res.status(200).json(error);
    }
})

module.exports = router;