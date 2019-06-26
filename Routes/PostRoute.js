import express from 'express'
import PostController from '../Controllers/PostController'

const router = express.Router()

router
    .get('/', PostController.index)
    .post('/', PostController.create)
    .get('/:_id', PostController.retrieve)
    .patch('/:_id', PostController.update)
    .delete('/:_id', PostController.delete)

module.exports = router
