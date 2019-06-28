import models from '../models'

const Posts = models.posts


class PostController {

	static async feed(req, res){

		let {limit, offset} = req.query

		await Posts.findAll({
			limit: limit || 5,
			offset,
			include: [{
				model: models.user,
				attributes: [
					'id',
					'username',
					'profile_pic_url'
				]
			}]
		}).then(posts => {
			return res.status(200).send(posts)
		}).catch(error => {
			console.log(error)
			return res.status(500).send('Internal server error')
		})

	}

	static async index(req, res) {

		let user_id = req.user.id
		let { limit, offset } = req.query

		await Posts.findAll({
			limit: limit || 5,
			offset,
			where: {
				user_id
			},
			include: [{
				model: models.user,
				attributes: [
					'id',
					'username',
					'profile_pic_url'
				]
			}],
		}).then(posts => {
			return res.status(200).send(posts)
		}).catch(error => {
			console.log(error)
			return res.status(500).send('Internal server error')
		})

	}

	static async create(req, res) {

		let user_id = req.user.id
		let { media_url, caption } = req.body

		await Posts.create({ user_id, media_url, caption })
			.then(createdPost => {
				return res.status(201).send(createdPost)
			})
			.catch(error => {
				console.log('Post create error :', error)
				return res.status(500).send(error)
			})

	}

	static async retrieve(req, res) {

		let post_id = req.params._id

		await Posts.findOne({ where: { id: post_id } })
			.then(foundedPost => {
				if (foundedPost) {
					return res.status(200).send(foundedPost)
				}

				return res.status(404).send({ detail: 'Data not found' })
			}).catch(error => {
				console.log('Post retrieve error :', error)
				return res.status(500).send('Internal server error')
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
						return res.status(200).send(updatedData)
					}).catch(error => {
						console.log('Post update error :', error)
						return res.send(400, 'Update failed')
					})

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
		let post_id = req.params._id

		await Posts.findOne({ where: { id: post_id, user_id } })
			.then(post => {
				if (post) {
					post.destroy()
					return res.status(204).send({})
				}

				return res.status(404).send({ detail: 'Not found' })
			})
			.catch(error => {
				console.log('Post delete error :', error)
			})

	}
}

module.exports = PostController
