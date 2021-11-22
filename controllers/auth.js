<<<<<<< Updated upstream
exports.getLogin = (req, res, next) => {
=======
const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.getSignInUp = (req, res, next) => {
>>>>>>> Stashed changes
    res.render('auth/signInUp', {
        pageTitle: 'Log In',
        path: '/auth/login'
    });
};

<<<<<<< Updated upstream
=======
exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    let userName = req.body.userName;
    if (!userName) {
        userName = email.split('@')[0];
    }
    const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: bcrypt.hashSync(password, 10),
        userName: userName
    });
    user.save()
        .then(result => {
            res.redirect('/signInUp');
        })
        .catch(err => console.log(err));

};

exports.postLogIn = (req, res, next) => {
    console.log('postLogIn');
    const email = req.body.email;
console.log(req.body.email);
    console.log(email);
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            console.log(user);
            if (!user) {
                console.log('User not found');
                return res.redirect('/signInUp');
            }
            if (bcrypt.compareSync(password, user.password)) {
                console.log("Login worked")
                return res.redirect('/');
            }
            console.log('Login failed');
            return res.redirect('/signInUp');
        })
        .catch(err => console.log(err));
};



>>>>>>> Stashed changes
exports.getReset = (req, res, next) => {
    res.render('auth/passwordReset',{
        pageTitle: 'Password Reset',
        path: '/auth/reset'
    });
};

exports.getPreferences = (req, res, next) => {
    res.render('auth/preferences',{
        pageTitle: 'Preferences',
        path: '/auth/preferences'
    });
}