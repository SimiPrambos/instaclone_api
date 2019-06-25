import express from 'express'
import UserController from '../Controllers/UserController'

const router = express.Router()

router.get('/me', UserController.me)

module.exports = router
