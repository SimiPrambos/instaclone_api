import JwtAuthMiddleware from '../Middleware/JwtAuthMiddleware'
import UserRoute from './UserRoute'
import AuthRoute from './AuthRoute'
import PostRoute from './PostRoute'

const routes = (app) => {
	app.use('/api/v1/auth', [], AuthRoute)
	app.use('/api/v1/users', [JwtAuthMiddleware.isAuthenticated], UserRoute)
	app.use('/api/v1/posts', [JwtAuthMiddleware.isAuthenticated], PostRoute)
}

module.exports = routes
