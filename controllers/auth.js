const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/User')
const { createToken } = require('./authHelpers')
// login
router.route('/').post((req, res) => {
  User.findOne({ email: req.body.email }, '+password', function (
    err,
    user,
    next
  ) {
    if (err) return next(err)
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' })
    }
    user.comparePassword(req.body.password, user.password, function (
      err,
      isMatch
    ) {
      console.log('is match', isMatch)
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' })
      }
      res.send({ token: createToken(user), roles: user.roles })
    })
  })
})

module.exports = router
