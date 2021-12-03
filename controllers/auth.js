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
    const securityPhrase = req.body.securityPhrase;
    const passwordHint = req.body.passwordHint;
    let userName = req.body.userName;
    if (!userName) {
        userName = email.split('@')[0];
    }
    if(User.findOne({ email: email })){
        console.log('User already exists');
        res.redirect('/signInUp');
    }
    
    const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: bcrypt.hashSync(password, 10),
        userName: userName,
        securityPhrase: securityPhrase,
        passwordHint: passwordHint
    });
    user.save()
        .then(result => {
            console.log('User created');
            res.render('home');
        })
        .catch(err => console.log(err));

};

exports.postLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            console.log(user);
            if (!user) {
                console.log('User not found');
                return res.redirect('/signInUp');
            }
            if (bcrypt.compareSync(password, user.password)) {
                req.session.isLoggedIn = true;
                req.session.email = user.email;
                req.session.userId = user._id;
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
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    User.findById(req.session.userId)
        .then(user => {
            res.render('auth/preferences', {
                pageTitle: 'Preferences',
                path: '/auth/preferences',
                user: user
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateNames = (req, res, next) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const userId = req.session.userId;
    User.findByIdAndUpdate(userId, {
        firstName: firstName,
        lastName: lastName,
        email: email
    })
    .then(() => {
        console.log('User updated');
        res.redirect('/preferences');
    })
    .catch(err => console.log(err));
}

exports.postUpdatePassword = (req, res, next) => {
    const password = req.body.password;
    const userId = req.session.userId;
    User.findByIdAndUpdate(userId, {
        password: bcrypt.hashSync(password, 10)
    })
    .then(() => {
        console.log("Password updated");
        res.redirect('/preferences');
    })
    .catch(err => console.log(err));
}

exports.postUpdateSecurityPhrase = (req, res, next) => {
    const securityPhrase = req.body.securityPhrase;
    const passwordHint = req.body.phraseHint;
    const userId = req.session.userId;
    User.findByIdAndUpdate(userId, {
        securityPhrase: securityPhrase,
        passwordHint: passwordHint
    })
    .then(() => {
        res.redirect('/preferences');
    })
    .catch(err => console.log(err));
}