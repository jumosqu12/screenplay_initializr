import express from 'express'
import { corsConfig } from './config/cors'
import cors from 'cors'
import comandRoutes from './routes/comandRoutes'

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

app.use('/api/v1/screenplay/architecture', comandRoutes)

export default app