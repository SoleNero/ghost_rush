'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();


//login route!
router.post('/auth', (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !email.trim()) {
        return next(boom.create(400, 'Email must not be blank'));
    }
    if (!password || password.length < 8) {
        return next(boom.create(400, 'Password must not be blank'));
    }
    let user;

    knex('users')
        .where('email', email)
        .first()
        .then((data) => {
            if (!data) {
                throw boom.create(400, 'Please enter a better email or password');
            }

            user = data;

            return bcrypt.compare(password, user.hashed_password);
        })
        .then((password) => {
            if (password === true) {
                delete user.hashed_password;

                const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
                const token = jwt.sign({
                    userId: user.id,
                    is_admin: user.is_admin,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '3h'
                }); 

                res.cookie('token', token, {
                    httpOnly: true,
                    expires: expiry,
                    secure: router.get('env') === 'production'
                });
                res.send(user);
            } else {
                next(boom.create(400, 'Bad email or password'));
            }
        })
        .catch(bcrypt.MISMATCH_ERROR, () => {
            throw boom.create(400, 'Bad email or password');
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/auth/:id', (req, res) => {
  res.clearCookie('token');
  res.send(true);
});


module.exports = router;
