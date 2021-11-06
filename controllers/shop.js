exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/auth/login'
    });
};

