function requireLoggedInUser(req, res, next) {
    if (!req.user) {
        return res.redirect('/login')
    }

    return next()
}

function requireAdminUser(req, res, next) {
    if (!req.user) {
        return res.redirect('/login')
    }

    // "ADMIN" = roleId 1
    if (req.user.roleId !== 1) {
        return res.status(403).json({ message: 'Forbidden: Admin access required.' })
        // TODO: redirect instead of a JSON response
    }

    return next()
}

module.exports = {
    requireLoggedInUser,
    requireAdminUser
}
