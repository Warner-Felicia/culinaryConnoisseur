exports.getLogin = (req, res, next) => {
    res.render('auth/signInUp', {
        pageTitle: 'Log In',
        path: '/auth/login'
    });
};

exports.getReset = (req, res, next) => {
    res.render('auth/passwordReset',{
        pageTitle: 'Password Reset',
        path: '/auth/reset'
    });
};