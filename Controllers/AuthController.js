import JwtAuthMiddleware from '../Middleware/JwtAuthMiddleware'
import models from '../models'

const User = models.user

class AuthController {

    static async login(req, res) {
        let { username, password } = req.body

        await User.findOne({ where: { username, password } })
            .then(user => {
                if (user) {
                    let jwt = JwtAuthMiddleware.signJwt({ id: user.id, email: user.email })
                    res.status(200).send({ email: user.email, jwt })
                }
                res.status(401).send({detail: 'Wrong username or password'})
            })
            .catch(err => {
                console.log(err)
            })
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
