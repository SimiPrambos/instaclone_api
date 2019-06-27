import jwt from 'jsonwebtoken'
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
console.log(SECRET_KEY)
class JwtAuthMiddleware {

	static async isAuthenticated(req, res, next) {
		await JwtAuthMiddleware.validateToken(req)
			.then(payload => {
				if (payload.status && payload.status !== 200) {
					res.status(payload.status).send(payload.message)
					return
				}

				req.user = payload.user
				next()
			})
			.catch(err => {
				console.log(err)
			})
	}

	static signJwt(user) {
		return jwt.sign({ user }, SECRET_KEY, { expiresIn: '1d' })
	}

	static decodeJwt(token) {
		let payload = null

		try {
			payload = jwt.decode(token, SECRET_KEY)
		} catch (err) {
			console.log('Decode Jwt Error : ', err)
		}
		return payload
	}

	static bearer(token) {
		return JwtAuthMiddleware.decodeJwt(token)
	}

	static extractToken(headers) {
		let token = headers.authorization.split(' ')[1]
		let type = headers.authorization.split(' ')[0]

		return { token, type }
	}

	static async validateToken(req) {
		let response = {}
		let payload = null

		if (!req.headers.authorization) {
			response.status = 401
			response.message = { detail: 'Authorization header is required' }
			return response
		}

		let { token, type } = JwtAuthMiddleware.extractToken(req.headers)

		switch (type) {
			case 'Bearer':
				payload = JwtAuthMiddleware.bearer(token)
				break
			default:
				response.status = 401
				response.message = { detail: 'Invalid token type. Must be type Bearer' }
				return response
		}

		// await Token.findOne({
		// 	where: { jwt: token, blacklisted: true }
		// }).then(tokenBlacklisted => {
		// 	if (tokenBlacklisted) {
		// 		response.status = 401
		// 		response.message = 'Authorization Denied.'
		// 	}
		// }).catch(error => {
		// 	console.log('token find error')
		// })

		if (!payload || !payload.user) {
			response.status = 401
			response.message = 'Authorization Denied.'
			return response
		}

		return payload
	}
}

module.exports = JwtAuthMiddleware
