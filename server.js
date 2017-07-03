console.log('application started');
const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const models = require('./models');
const index = require('./routes/index-controller');
const users = require('./routes/users-controller');
const gabs = require('./routes/gabs-controller');
const homepage = require('./routes/homepage-controller');
const moment = require('moment');
moment().format();

const application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(cookieParser());
application.use(bodyParser.urlencoded());
application.use(session({
    secret: 'bruinisinthehouse',
    resave: false,
    saveUninitialized: true
}))

application.use(express.static(__dirname + '/public'));

application.use(index);
application.use(users);
application.use(gabs);
application.use(homepage);

application.listen(3000);