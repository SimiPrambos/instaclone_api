import models from '../models/index'

const User = models.user

class UserController {

	static async me(req, res) {
		await User.findOne({
			where: {
				id: req.user.id
			},
			attributes: [
				'id',
				'username',
				'email',
				'profile_pic_url',
				'created_at',
				'updated_at'
			],
			include: 'posts'
		})
			.then(user => {
				if (user) {
					res.status(200).send(user)
				}

				// res.status(404, { detail: 'user not found' })
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({ detail: err })
			})
	}
}

module.exports = UserController
