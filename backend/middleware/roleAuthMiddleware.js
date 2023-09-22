const roleAuthMiddleware = (permissons) => {
    return (req, res, next) => {
        userRole = req.body.role;

        if (permissons.includes(userRole)) {
            next();
        } else {
            return res.status(401).json("You are not authorized to access this route");
        }
    };
};

module.exports = roleAuthMiddleware;