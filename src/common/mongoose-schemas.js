import { URL_REGEX } from './constants'

export const URL_SCHEMA = {
  type: String,
  required: true,
  match: URL_REGEX
}
