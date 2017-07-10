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
    var model = {gabs: gabs, user:request.session.user};
    response.render('dashboard', model)
});

router.get('/dashboard/data', async (request, response) => {
    var gabs = await models.gabs.all();
    for (i = 0; i < gabs.length; i++) {
        if (gabs[i].userId === request.session.user.id) {
            gabs[i].belongsToCurrentUser = true;
        }
        else {
            gabs[i].belongsToCurrentUser = false;
        }
    }
    var model = {gabs: gabs, user:request.session.user};
    response.send(model);
});

module.exports = router;