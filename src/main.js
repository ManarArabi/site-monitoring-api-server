import app from './app.js'
import mongoose from 'mongoose'
import { pollUrlTaskSchedularServices } from './common/services/poll-url-task-schedular.js'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Mongoose is running')

  pollUrlTaskSchedularServices.startScheduledCheckEntries()
}).catch(() => {
  console.log('Failed to start mongoose')
})
