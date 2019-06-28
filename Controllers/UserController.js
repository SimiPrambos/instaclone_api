import models from '../models/index'

const User = models.user

class UserController {

	static async retrieve(req, res) {
		await User.findOne({
			where: {
				id: req.user.id
			},
			attributes: [
				'id',
				'username',
				'email',
				'first_name',
				'last_name',
				'profile_pic_url',
				'created_at',
				'updated_at'
			]
		})
			.then(user => {
				if (user) {
					return res.status(200).send(user)
				}

				res.status(404, { detail: 'user not found' })
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({ detail: err })
			})
	}

	static async update(req, res) {
		let user_id = req.user.id
		let newData = req.body // TODO must be validated and serialized

		await User.findOne({
			where: { id: user_id },
			attributes: [
				'id',
				'username',
				'email',
				'first_name',
				'last_name',
				'profile_pic_url',
				'created_at',
				'updated_at',
			]
		}).then(user => {
			if (user) {
				user.update(newData).then(updatedData => {
					return res.status(200).send(updatedData)
				}).catch(error => {
					console.log('Post update error :', error)
					return res.status(400).send('Update failed')
				})
			} else {
				return res.status(404).send({ detail: 'Not found' })
			}
		})
			.catch(error => {
				console.log('Post update error :', error)
				return res.send(400, 'Update failed')
			})
	}

	static async delete(req, res) {
		let user_id = req.user.id

		await User.findOne({ where: { id: user_id } })
			.then(user => {
				if (user) {
					user.destroy()
					return res.status(204).send({})
				} else {
					return res.status(404).send({ detail: 'Not found' })
				}
			})
			.catch(error => {
				console.log('Post delete error :', error)
			})
	}
}

module.exports = UserController
