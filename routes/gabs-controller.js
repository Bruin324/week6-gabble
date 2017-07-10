const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');
moment().format();


router.post('/gabs', async (request, response) => {
    var description = request.body.description;
    var newGab = await models.gabs.create({ description: description, numLikes: 0 })
    response.redirect('/dashboard');
})

router.get('/create-gab', async (request, response) => {
    
    if (request.session.user.isAuthenticated != true) {
        render.render('login');
    }
    else {
        var user = request.session.user;
        response.render('create-gab')
    };
});

router.post('/create-gab', async (request, response) => {
    var gab = request.body.description;
    request.assert('description', 'Gab must be less than 140 characters').len(1, 140);
    var errors = request.validationErrors();
    if (errors) {
        var model = { errors: errors };
        response.render('create-gab', model);
    } else {
        var timestamp = moment().format("ddd, MMMM Do YYYY, h:mm a");
        var newGab = { description: gab, timestamp: timestamp, author: request.session.user.name, userId: request.session.user.id }
        await models.gabs.create(newGab);
        response.redirect('/dashboard');
    }
});

router.post('/like/:id', async (request, response) => {
    var gabLikedId = parseInt(request.params.id);
    var userLikedId = request.session.user.id;
    var userLikedName = request.session.user.name;
    var alreadyLiked = await models.likes.find({ where: { gabId: gabLikedId, userId: userLikedId } });

    if (!alreadyLiked) {
        var newLike = await models.likes.create({ gabId: gabLikedId, userId: userLikedId, userLiked: userLikedName });
    }
    response.redirect('/dashboard');
});

router.get('/single-gab/:id', async (request, response) => {
    
    if (request.session.user.isAuthenticated != true) {
        render.redirect('/login');
    }
    else {
        var gabId = request.params.id;
        var gab = await models.gabs.find({ where: { id: gabId } });
        var likes = await models.likes.findAll({ where: { gabId: gabId } });
        var model = {
            gab: gab,
            likes: likes
        }
        response.render('single-gab', model);
    };
});

router.post('/delete/:id', async (request, response) => {
    var gabId = parseInt(request.params.id);
    var removeLikes = await models.likes.destroy( { where: { gabId: gabId} });
    var removeGab = await models.gabs.destroy( { where: {id: gabId} });

    response.redirect('/dashboard');
});

module.exports = router;