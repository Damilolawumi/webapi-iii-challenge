const express = require('express');
const db = require('../posts/postDb');
const router = express.Router();
// const users = require('../users/userDb');



router.get('/', (req, res) => {
    db.get()
        .then(post => {
            res.status(200).json({ success: true, post })
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved" })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.getById(id)
    .then(user => {

    })
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res) {

};

module.exports = router;