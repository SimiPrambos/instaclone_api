import JwtAuthMiddleware from '../Middleware/JwtAuthMiddleware'
import models from '../models'

const User = models.user

class AuthController {

	static async login(req, res) {
		let { username, password } = req.body

		const user = await User.findOne({ where: { username } })
		if (!user) {
			return res.status(401).send({ message: 'not_registered' })
		}
		if (user && user.password !== password) {
			return res.status(401).send({ message: 'wrong_password' })
		}

		let jwt = JwtAuthMiddleware.signJwt({ id: user.id, email: user.email })
		res.status(200).send({ email: user.email, jwt })
	}

	// static async logout(req, res) {

	//     let {token, type} = JwtAuthMiddleware.extractToken(req.headers)
	//     await Token.create({jwt: token, blacklisted: true})
	//         .then(blacklistedToken => {
	//             console.log(blacklistedToken)
	//             res.status(200).send({})
	//         })
	//         .catch(error => {
	//             console.log('create token error')
	//             // res.status(500).send({})
	//         })

	// }

	static async register(req, res) {
		await User.create(req.body)
			.then(user => {
				let { id, username, email, createdAt } = user
				res.status(201).send({ id, username, email, createdAt })
			})
			.catch(err => {
				res.status(500).send(err)
			})
	}
}

module.exports = AuthController
