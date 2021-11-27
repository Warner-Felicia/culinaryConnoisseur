const User = require('../models/user');
const bcrypt = require('bcrypt');

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
                console.log("Login worked");
                return res.redirect('/');
            }
            console.log('Login failed');
            return res.redirect('/signInUp');
        })
        .catch(err => console.log(err));
};

exports.getReset = (req, res, next) => {
        res.render('auth/passwordReset', {
        pageTitle: 'Password Reset',
        path: '/auth/reset',
        hint: false
    });
};

exports.postShowHint = (req, res, next) => {
    const email = req.body.email;
    User.find({ email: email })
    .then(user => {
        res.render('auth/passwordReset', {
            pageTitle: 'Password Reset',
            path: '/auth/reset',
            hint: true,
            user: user[0]
        });
    })
    .catch(err => console.log(err));
};

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    const securityPhrase = req.body.securityPhrase;
    User.findOne({ email: email })
    .then(user => {
        if(user.securityPhrase !== securityPhrase) {
            res.redirect('/reset');
        } else {
            res.redirect('/preferences');
        }
        
    })
    .catch(err => console.log(err));
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
};

exports.getPreferences = (req, res, next) => {
    res.render('auth/preferences',{
        pageTitle: 'Preferences',
        path: '/auth/preferences'
    });
};
