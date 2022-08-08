require('dotenv').config()
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const checkAuth = require('./middleware/checkAuth');
app.use(checkAuth);


//HOME
app.get('/', (req, res) => {
    const currentUser = req.user;
    res.render('home',{currentUser});
  });
  
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const auth = require('./controllers/auth.js')(app);


app.listen(3000);