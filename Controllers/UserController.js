import models from '../models/index'

const User = models.user

class UserController {

	static async me(req, res) {
		await User.findByPk(req.user.id)
			.then(user => {
				if (user) {
					let { id, username, email, createdAt, updatedAt } = user
					res.status(200).send({ id, username, email, createdAt, updatedAt })
				}

				res.status(404, { detail: 'user not found' })
			})
			.catch(err => {
				res.status(500).send({ detail: err })
			})
	}
}

module.exports = UserController
