const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/login', (request, response) => {
    response.render('login');
})

router.get('/login/data', (request, response) => {
    response.send(request.session);
})

router.get('/register', (request, response) => {
    response.render('register');
});

router.post('/register', async (request, response) => {
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var cpwd = request.body.cpwd;
    // validate email, password, confirm password
    // request.checkbody()
    var newUser = await models.users.create({ name: name, email: email, password: password });
    var userSession = {
    name: newUser.name,
    email: newUser.email,
    isAuthenticated: true,
    id: newUser.id
    }
    request.session.user = userSession;


    // response.send(newUser);
    response.redirect('dashboard')

})

router.post('/login', async (request, response) => {
    var query = { where: { email: request.body.email, password: request.body.password } };
    var user = await models.users.find(query);
    if (user) {
        var userSession = {
            name: user.name,
            email: user.email,
            isAuthenticated: true,
            id: user.id
        }
        request.session.user = userSession;
        // response.send(request.session);
        response.redirect('dashboard');
    } else {
        var msg = "Invalid Email/Password";
        var error = {msg: msg};
        response.render('login', error);
    }
});

router.post('/logout', (request, response) => {
    request.session.destroy(function (err) {
    });
    response.render('login');
})

module.exports = router;