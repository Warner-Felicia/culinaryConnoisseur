const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');

const connectionString = process.env.DATABASE_CONNECTION_STRING;

const app = express();
const oneHour = 1000 * 60 * 60;
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: oneHour
    }
}));

const csrfProtection = csrf();

app.use(bodyParser.urlencoded({
   extended: false
 }));


app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use('/500', errorController.get500);

app.use(errorController.get404);

mongoose.connect(connectionString)
    .then(result => {
        app.listen(3000);
    })
   .catch(err => console.log(err));