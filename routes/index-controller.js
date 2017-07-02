const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    if (request.session.isAuthenticated != true) {
        response.render('index');
    } else {
        response.redirect('dashboard');
    }

})

module.exports = router;