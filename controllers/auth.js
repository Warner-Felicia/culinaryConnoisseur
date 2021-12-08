const {
    validationResult
} = require('express-validator');

const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getSignInUp = (req, res, next) => {
    res.render('auth/signInUp', {
        pageTitle: 'Log In',
        path: '/auth/login',
        hasError: false,
        errorMessage: null,
        validationErrors: [],
        errorMessage2: null

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signInUp', {
            pageTitle: 'Log In',
            path: '/auth/login',
            hasError: true,
            errorMessage: errors.array()[0].msg,
            errorMessage2: null,
            validationErrors: errors.array(),
            user: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                securityPhrase: securityPhrase,
                passwordHint: passwordHint
            }
        });
    }
    User.findOne({
        email: email
    }).then(user => {
        if(user) {
            console.log('User already exists');
            return res.status(422).render('auth/signInUp', {
                pageTitle: 'Log In',
                path: '/auth/login',
                hasError: true,
                errorMessage: 'An account with that email already exists',
                errorMessage2: null,
                validationErrors: errors.array(),
                user: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    securityPhrase: securityPhrase,
                    passwordHint: passwordHint
                }
            });;
        }
    });        

    const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: bcrypt.hashSync(password, 10),
        userName: userName,
        securityPhrase: bcrypt.hashSync(securityPhrase, 10),
        passwordHint: passwordHint
    });
    user.save()
        .then(result => {
            console.log('User created');
            return res.status(422).render('shop/home',{
                pageTitle: 'home'
            });
        })
        .catch(err => console.log(err));

};

exports.postLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signInUp', {
            pageTitle: 'Log In',
            path: '/auth/login',
            hasError: true,
            errorMessage: null,
            errorMessage2: errors.array()[0].msg,
            validationErrors: errors.array(),
            user: {
                email: email,
            }
        });
    }
    User.findOne({
            email: email
        })
        .then(user => {
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
        hint: false,
        hasError: false,
        errorMessage: null,
        valdiationErrors: []
    });
};

exports.postShowHint = (req, res, next) => {
    const email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/passwordReset', {
            pageTitle: 'Password Reset',
            path: '/auth/reset',
            hint: false,
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            user: {
                email: email,
            }
        });
    }
    User.find({
            email: email
        })
        .then(user => {
            res.render('auth/passwordReset', {
                pageTitle: 'Password Reset',
                path: '/auth/reset',
                hint: true,
                hasError: false,
                errorMessage: null,
                validationErrors: [],
                user: user[0]
            });
        })
        .catch(err => console.log(err));
};

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    const securityPhrase = req.body.securityPhrase;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/passwordReset', {
            pageTitle: 'Password Reset',
            path: '/auth/reset',
            hint: true,
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            user: {
                email: email,
            }
        });
    }
    User.findOne({
            email: email
        })
        .then(user => {
            if (bcrypt.compareSync(securityPhrase, user.securityPhrase)) {
                req.session.isLoggedIn = true;
                req.session.email = user.email;
                req.session.userId = user._id;
                res.redirect('/preferences');
            } else {
                res.redirect('/preferences');
                res.status(422).render('auth/passwordReset', {
                    pageTitle: 'Password Reset',
                    path: '/auth/reset',
                    hint: true,
                    hasError: true,
                    errorMessage: 'Security phrase in incorrect',
                    validationErrors: errors.array(),
                    user: {
                        email: email,
                    }
                });
            }

        })
        .catch(err => console.log(err));
};

exports.postDeleteUser = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const userId = req.session.userId;
    User.findByIdAndRemove(userId)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.getPreferences = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/signInUp');
    }
    // const user = req.session.isLoggedIn;
    // console.log(user);
    User.findById(req.session.userId)
        .then(user => {
            res.render('auth/preferences', {
                pageTitle: 'Preferences',
                path: '/auth/preferences',
                users: user,
                hasErrors: false,
                errorMessage: null,
                errorMessage2: null,
                errorMessage3: null
                // user: user
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateNames = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const userId = req.session.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/preferences', {
            pageTitle: 'Preferences',
            path: '/auth/preferences',
            users: {
                firstName: firstName,
                lastName: lastName,
                email: email
            },
            hasErrors: true,
            errorMessage: errors.array()[0].msg,
            errorMessage2: null,
            errorMessage3: null
            // user: user
        });
    }
    User.findOne({
            email: email
        })
        .then(user => {
            if (user._id.toString() !== userId) {
                return res.status(422).render('auth/preferences', {
                    pageTitle: 'Preferences',
                    path: '/auth/preferences',
                    users: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    },
                    hasErrors: true,
                    errorMessage: 'That email address is already associated with another account',
                    // user: user
                });
            }
        })
        .catch(err => console.log(err));
    User.findByIdAndUpdate(userId, {
            firstName: firstName,
            lastName: lastName,
            email: email
        })
        .then(() => {
            console.log('User updated');
            return res.status(422).render('auth/preferences', {
                pageTitle: 'Preferences',
                path: '/auth/preferences',
                users: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                },
                hasErrors: false,
                errorMessage: 'Your account has been updated',
                errorMessage2: null,
                errorMessage3: null
                // user: user
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdatePassword = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const password = req.body.password;
    const userId = req.session.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        User.findById(userId)
            .then(user => {
                return user;
            }).then(user => {
                return res.status(422).render('auth/preferences', {
                    pageTitle: 'Preferences',
                    path: '/auth/preferences',
                    users: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    },
                    hasErrors: true,
                    errorMessage: null,
                    errorMessage2: errors.array()[0].msg,
                    errorMessage3: null
                    // user: user
                });
            })
            .catch(err => console.log(err));
    } else {
        User.findByIdAndUpdate(userId, {
                password: bcrypt.hashSync(password, 10)
            })
            .then(() => {
                return User.findById(userId);
            })
            .then(user => {
                return res.status(422).render('auth/preferences', {
                    pageTitle: 'Preferences',
                    path: '/auth/preferences',
                    users: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    },
                    hasErrors: true,
                    errorMessage: null,
                    errorMessage2: 'Password updated',
                    errorMessage3: null
                    // user: user
                });
            })
            .catch(err => console.log(err));
    }
};

exports.postUpdateSecurityPhrase = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const securityPhrase = req.body.securityPhrase;
    const passwordHint = req.body.phraseHint;
    const userId = req.session.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        User.findById(userId)
        .then(user => {
            return res.status(422).render('auth/preferences', {
                pageTitle: 'Preferences',
                path: '/auth/preferences',
                users: user,
                hasErrors: true,
                errorMessage: null,
                errorMessage2: null,
                errorMessage3: errors.array()[0].msg,
                // user: user
            });
        })
        .catch(err => console.log(err));        
    } else {
        User.findByIdAndUpdate(userId, {
            securityPhrase: bcrypt.hashSync(securityPhrase, 10),
            passwordHint: passwordHint
        })
        .then(() => {
            return User.findById(userId);
        })
        .then(user => {
            console.log(user);
            return res.status(422).render('auth/preferences', {
                pageTitle: 'Preferences',
                path: '/auth/preferences',
                users: user,
                hasErrors: true,
                errorMessage: null,
                errorMessage2: null,
                errorMessage3: 'Security phrase and/or hint updated',
                // user: user
            });
        })
        .catch(err => console.log(err));
    }
};

exports.postLogout = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/signInUp');
    });
};