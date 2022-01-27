import { URL_REGEX } from './index.js'

export const URL_SCHEMA = {
  type: String,
  required: true,
  match: URL_REGEX
}
