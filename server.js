import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './Routes'

const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
routes(app)

app.get('/', (req, res) => {
	res.send('Its running')
})

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
app.listen(process.env.PORT, () => {
	console.log(`Application running in ${process.env.NODE_ENV} mode.`)
})
