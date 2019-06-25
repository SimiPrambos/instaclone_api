import express from 'express'
import AuthController from '../Controllers/AuthController'

const router = express.Router()

router
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
    // .get('/logout', AuthController.logout)

module.exports = router
