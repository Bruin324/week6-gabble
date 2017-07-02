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
    var newGab = {description: request.body.description, author: request.session.user.name, numLikes:0, userId: request.session.user.id}
    await models.gabs.create(newGab);
    response.redirect('/dashboard');
});

router.post('/like/:id', async (request, response) => {
    var gabLikedId = request.params.id;
    var userLikedId = request.session.user.id;
    var userLikedName = request.session.user.name;
    var newLike = await models.likes.create({ gabId: gabLikedId, userId: userLikedId, userLiked: userLikedName });
    response.redirect('/dashboard');
});

module.exports = router;