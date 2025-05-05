const authorizationByRoles = (roles) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Acess Denied" });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Acess Denied" });
    }
    next();
}

const authorizationAuthor = (req, res, next) => {
    const user = req.user;
    const userId = req.params.id;
    if (user.id === userId) {
        return next();
    }
    return res.status(403).json({ message: "Forbidden" });
}

const authorizationByRolesOrAuthor = (roles) => (req, res, next) => {
    const user = req.user;
    const userId = req.params.id;

    if (!user) {
        return res.status(403).json({ message: "Access Denied" });
    }

    const isAllowedByRole = roles.includes(user.role);
    const isAuthor = user.id === userId;

    if (isAllowedByRole || isAuthor) {
        return next();
    }

    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
}

export { authorizationByRoles, authorizationAuthor, authorizationByRolesOrAuthor };