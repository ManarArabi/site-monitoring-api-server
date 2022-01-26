import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
// import * as swaggerSetup from './swagger/setup.json'
import { swaggerDocument } from './swagger/setup.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Mongoose is running')
}).catch(() => {
  console.log('Failed to start mongoose')
})

export default app
