import models from '../models'

const Posts = models.posts


class PostController {

	static async index(req, res) {

		let user_id = req.user.id

		await Posts.findAll({
			where: { user_id }
		}).then(posts => {
			res.status(200).send(posts)
		}).catch(error => {
			console.log(error)
			res.status(500).send('Internal server error')
		})

	}

	static async create(req, res) {

		let user_id = req.user.id
		let { media_url, caption } = req.body

		await Posts.create({ user_id, media_url, caption })
			.then(createdPost => {
				res.status(201).send(createdPost)
			})
			.catch(error => {
				console.log('Post create error :', error)
				res.status(500).send(error)
			})

	}

	static async retrieve(req, res) {

		let post_id = req.params._id

		await Posts.findOne({ where: { id: post_id } })
			.then(foundedPost => {
				if (foundedPost) {
					res.status(200).send(foundedPost)
				}

				res.status(404).send({ detail: 'Data not found' })
			}).catch(error => {
				console.log('Post retrieve error :', error)
				res.status(500).send('Internal server error')
			})

	}
	static async update(req, res) {

		let user_id = req.user.id
		let post_id = req.params._id
		let newData = req.body // TODO must be validated and serialized

		await Posts.findOne({ where: { id: post_id, user_id } })
			.then(post => {
				if (post) {
					post.update(newData).then(updatedData => {
						res.status(200).send(updatedData)
					}).catch(error => {
						console.log('Post update error :', error)
						res.send(400, 'Update failed')
					})

					res.status(404).send({ detail: 'Not found' })
				}
			})
			.catch(error => {
				console.log('Post update error :', error)
				res.send(400, 'Update failed')
			})

	}
	static async delete(req, res) {
		let user_id = req.user.id
		let post_id = req.params._id

		await Posts.findOne({ where: { id: post_id, user_id } })
			.then(post => {
				if (post) {
					post.destroy()
					res.status(204).send({})
				}

				res.status(404).send({ detail: 'Not found' })
			})
			.catch(error => {
				console.log('Post delete error :', error)
			})

	}

	static postSerializer(data) {
		let result = []
		data.map(value => {
			value.dataValues.media = JSON.parse(value.media)
			result.push(value.dataValues)
		})
		return result
	}
}

module.exports = PostController
