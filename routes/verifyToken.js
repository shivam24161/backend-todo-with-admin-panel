const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json("you are not authorized");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
            return res.status(403).json("token is not valid");
        }
        req.user = user;
        next();
    })
}

const verifyTokenAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin || req.user.isSuperAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed to do that");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user.isSuperAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed to do that");
        }
    })
}

const verifyTokenAndSuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isSuperAdmin) {
            next();
        }
        else {
            res.status(500).json("you are not a super admin");
        }
    })
}

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAndAdmin, verifyTokenAndSuperAdmin }