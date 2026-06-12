module.exports = (req, res, next) => {

    if (
        !req.session.usuario ||
        !req.session.usuario.admin
    ) {

        return res.status(403).render('403');
    }

    next();
};
