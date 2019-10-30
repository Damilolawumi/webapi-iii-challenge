const express = require('express');
const db = require('../users/userDb');
const router = express.Router();
const postDb = require('../posts/postDb');



router.get('/', getUsers);


router.post('/', validateUser, createUser);
router.get('/:id', validateUserId, getUserById);
router.delete('/:id', validateUserId, deleteUser);
router.put('/:id', validateUserId, editUsersId)
router.get('/:id/posts', validateUserId, getUsersPostId);
router.post('/:id/posts', validateUserId, validatePost, createUsersPost);

function createUsersPost (req, res) {
    postDb.insert(
        {
            text: req.body.text,
            user_id: req.user.id
        })
    .then(newPost => {
        res.status(201).json(newPost)
    })
    .catch(() => {
        res.json(500).json({ errorMessage: 'post was not created'})
    })
}

function getUsersPostId(req, res) {
    db.getUserPosts(req.user.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'could not get users post' })
        })

}

function editUsersId(req, res) {
    db.update(req.user.id, req.body)
        .then(() => {
            res.status(200).json({ ...req.user, ...req.body })
        })
        .catch((error) => {
            res.status(500).json({ error: 'user was not updated: ' + error })
        })
}

function deleteUser(req, res) {
    db.remove(req.user.id)
        .then(() => {
            res.status(200).json({ deletedUser: req.user })
        })
        .catch((error) => {
            res.status(500).json({ error: 'user was not deleted: ' + error })
        }
        )
}


function getUserById(req, res) {
    res.json(req.user)
}

function createUser(req, res) {
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch((error) => {
            res.status(500).json({ error: 'user was not created: ' + error })
        })
}

function getUsers(req, res) {
    db.get()
        .then(users => {
            res.status(200).json({ success: true, users })
        })
        .catch(() => {
            res.status(500).json({ error: 'Information not available' })
        })
}

//custom middleware

function validateUserId(req, res, next) {
    db.getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(404).json({ message: "invalid user id" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "invalid user id" })
        })
};

function validateUser(req, res, next) {
    if (Object.keys(req.body).length) {
        if (req.body.name) {
            next();
        }
        else {
            res.status(400).json({ message: "missing user data" })
        }

    }
    else {
        res.status(400).json({ message: "missing required name field" })
    }
};

function validatePost(req, res, next) {
    if (Object.keys(req.body).length) {
        if (req.body.text) {
            next();
        }
        else {
            res.status(400).json({ message: "missing post data" })
        }

    }
    else {
        res.status(400).json({ message: "missing required text field" })
    }
};

module.exports = router
