exports.getIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/login'
    });
};