import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './config/index.js'
import appRouter from './router.js'
import httpStatus from 'http-status'
import { errorHandler } from './common/middleware/error-handler.js'

const { NOT_FOUND } = httpStatus

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(appRouter)

app.use(errorHandler)

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` })
})

export default app
