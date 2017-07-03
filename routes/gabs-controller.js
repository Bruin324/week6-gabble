const express = require('express');
const router = express.Router();
const models = require('../models');


router.post('/gabs', async (request, response) => {
    var description = request.body.description;
    var newGab = await models.gabs.create({ description: description, numLikes: 0 })
    response.redirect('/dashboard');
})

router.get('/create-gab', async (request, response) => {
    var user = request.session.user;
    response.render('create-gab');
});

router.get('/create-gab/data', async (request, response) => {
    var user = request.session.user;
    response.send(request.session);
});

router.post('/create-gab', async (request, response) => {
    var gab = request.body.description;
    request.checkBody('gab', 'Gab must be less than 140 characters').len(140);
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
    var gabLikedId = request.params.id;
    var userLikedId = request.session.user.id;
    var userLikedName = request.session.user.name;
    var newLike = await models.likes.create({ gabId: gabLikedId, userId: userLikedId, userLiked: userLikedName });
    response.redirect('/dashboard');
});

router.get('/single-gab/:id', async (request, response) => {
    var gabId = request.params.id;
    var gab = await models.gabs.find({ where: { id: gabId } });
    var likes = await models.likes.findAll({ where: { gabId: gabId } });
    var model = {
        gab: gab,
        likes: likes
    }
    response.render('single-gab', model);
});

module.exports = router;