const express = require('express');
const db = require('../posts/postDb');
const router = express.Router();
const users = require('../users/userDb');



router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res) {

};

module.exports = router;