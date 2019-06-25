import JwtAuthMiddleware from '../Middleware/JwtAuthMiddleware'
import UserRoute from './UserRoute'
import AuthRoute from './AuthRoute'

const routes = (app) => {
    app.use('/api/v1/auth', [], AuthRoute)
    app.use('/api/v1/users', [JwtAuthMiddleware.isAuthenticated], UserRoute)
}

module.exports = routes
