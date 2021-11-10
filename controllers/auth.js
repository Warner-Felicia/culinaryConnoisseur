exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Log In',
        path: '/login'
    });
};