import { EMAIL, MOBILE, WEBHOOK } from '../../constants/misc.js'
import { sendEmailServices } from '../send-email.js'

const sendMobileAlert = ({ webhook, message }) => {
  // TODO to be implemented
}

const sendWebHookAlert = ({ mobileToken, message }) => {
  // TODO to be implemented
}

export const getUrlIsUpHtmlAlert = ({ url, checkEntryId }) => `<p>Your monitored url: ${url} with check entry id: ${checkEntryId} is up and running now</p>`
export const getUrlIsDownHtmlAlert = ({ url, checkEntryId }) => `<p>Your monitored url ${url} with check entry id: ${checkEntryId} is down and not responding from a while</p>`

export const getUrlIsUpAlert = ({ url, checkEntryId }) => `Your monitored url ${url} with check entry id: ${checkEntryId} is up and running now`
export const getUrlIsDownAlert = ({ url, checkEntryId }) => `Your monitored url ${url} with check entry id: ${checkEntryId} is down and not responding from a while`

export const sendAlertServices = {
  [MOBILE]: [sendMobileAlert],
  [WEBHOOK]: [sendWebHookAlert],
  [EMAIL]: [sendEmailServices.sendEmail]
}
