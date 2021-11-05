exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Log In',
        path: '/auth/login'
    });
};