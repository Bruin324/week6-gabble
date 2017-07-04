const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/dashboard', async (request, response) => {

    if (request.session.user.isAuthenticated != true) {
        render.redirect('login');
    }
    else {
        var gabs = await models.gabs.all({
            order: [['createdAt', 'DESC']],
            include: [models.likes]
        });
        for (i = 0; i < gabs.length; i++) {
            if (gabs[i].userId === request.session.user.id) {
                gabs[i].belongsToCurrentUser = true;
            }
            else {
                gabs[i].belongsToCurrentUser = false;
            }
        }
    }
    // var users = await models.users.all();
    var model = {gabs: gabs, user:request.session.user};
    // request.session.users = users;
    //this is where the session will hold all the gabs/likes and rendered onto page
    //aka load in gabs tableshere into model
    // response.send(request.session);
    response.render('dashboard', model)
});

router.get('/dashboard/data', async (request, response) => {

    // if (request.session.user.isAuthenticated != true) {
    //     render.redirect('login');
    // }
    // else {
    var gabs = await models.gabs.all();
    for (i = 0; i < gabs.length; i++) {
        if (gabs[i].userId === request.session.user.id) {
            gabs[i].belongsToCurrentUser = true;
        }
        else {
            gabs[i].belongsToCurrentUser = false;
        }
    }
    // var users = await models.users.all();
    var model = {gabs: gabs, user:request.session.user};
    // request.session.users = users;
    //this is where the session will hold all the gabs/likes and rendered onto page
    //aka load in gabs tableshere into model
    response.send(model);
    // response.render('dashboard', request.session)
    // }
});

module.exports = router;