import { isNil } from 'ramda'
import { sendRequests } from './requests.js'

export const webhookServices = {
  async sendWebhookAlert ({ message, url, checkEntryId, webhook }) {
    console.log('sendWebhook alert')
    if (!isNil(webhook)) {
      await sendRequests.sendPostRequest({
        url: webhook,
        data: {
          url,
          message,
          checkEntryId
        }
      })
    }
  }
}
