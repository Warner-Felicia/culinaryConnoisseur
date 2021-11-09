exports.getIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/'
    });
};

exports.postIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/'
    });
};

exports.getLogin = (req, res, next) => {
    res.render('signInUp', {
        pageTitle: 'Login',
        path: '/signInUp'
    });
};

exports.postLogin = (req, res, next) => {
    res.render('signInUp', {
        pageTitle: 'Login',
        path: '/signInUp'
    });
};