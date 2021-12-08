const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');

const MONGODB_URI = process.env.MONGODB_URL;

const cors = require('cors');

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

const corsOptions = {
    origin: "https://culinary-connoisseur.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    family: 4
};

const PORT = MONGODB_URI || 5000;
                        
mongoose
  .connect(
    PORT, options
  )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
// mongoose.connect(connectionString)
//     .then(result => {
//         app.listen(3000);
//     })
//    .catch(err => console.log(err));