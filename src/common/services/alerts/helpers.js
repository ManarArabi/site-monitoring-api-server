import { EMAIL, MOBILE, WEBHOOK } from '../../constants/misc.js'
import { sendEmailServices } from '../send-email.js'
import { webhookServices } from '../webhook.js'

const sendMobileAlert = ({ webhook, message }) => {
  // TODO to be implemented
}

export const getUrlIsUpAlert = ({ url, checkEntryId }) => ({
  message: `Your monitored url ${url} with check entry id: ${checkEntryId} is up and running now`,
  html: `<p>Your monitored url: ${url} with check entry id: ${checkEntryId} is up and running now</p>`
})

export const getUrlIsDownAlert = ({ url, checkEntryId }) => ({
  message: `Your monitored url ${url} with check entry id: ${checkEntryId} is down and not responding from a while`,
  html: `<p>Your monitored url ${url} with check entry id: ${checkEntryId} is down and not responding from a while</p>`
})

export const sendAlertServices = {
  [MOBILE]: [sendMobileAlert],
  [WEBHOOK]: [webhookServices.sendWebhookAlert],
  [EMAIL]: [sendEmailServices.sendEmail]
}
