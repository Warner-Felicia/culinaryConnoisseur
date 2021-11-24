const User = require('../models/user');


exports.getSignInUp = (req, res, next) => {
    res.render('auth/signInUp', {
        pageTitle: 'Log In',
        path: '/auth/login'
    });
};

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let userName = req.body.userName;
    if (!userName) {
        userName = email.split('@')[0];
    }
    const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        userName: userName
    });
    user.save()
        .then(result => {
            res.redirect('/signInUp');
        })
        .catch(err => console.log(err));

};

exports.getReset = (req, res, next) => {
    res.render('auth/passwordReset', {
        pageTitle: 'Password Reset',
        path: '/auth/reset'
    });
};


exports.postUpdatePreferences = (req, res, next) => {
    const updatedEmail = req.body.email;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedUserName = req.body.userName;
    //**TO-DO replace hard-coded userId with session userId */
    const userId = '618dceb783540affde17a5a9';
    User.findById(userId)
        .then(user => {
            user.email = updatedEmail;
            user.firstName = updatedFirstName;
            user.lastName = updatedLastName;
            user.userName = updatedUserName;
            console.log('updating user');
            return user.save();
        })
        .then(result => {
            //**TO-DO decide where we really want this to go */
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postDeleteUser = (req, res, next) => {
    //**TO-DO replace hard-coded userId with session user */
    const userId = '618d951db51a9ea1580b80af';
    User.findByIdAndRemove(userId)
    .then(() => {
        //**TO-DO decide where we really want this to go */
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.getPreferences = (req, res, next) => {
    res.render('auth/preferences',{
        pageTitle: 'Preferences',
        path: '/auth/preferences'
    });

};