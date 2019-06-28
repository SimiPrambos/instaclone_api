import express from 'express'
import UserController from '../Controllers/UserController'

const router = express.Router()

router
	.get('/me', UserController.retrieve)
	.patch('/me', UserController.update)

module.exports = router
