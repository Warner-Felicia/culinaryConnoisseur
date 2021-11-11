exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/auth/login'
    });
};

exports.postIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/'
    });
};
