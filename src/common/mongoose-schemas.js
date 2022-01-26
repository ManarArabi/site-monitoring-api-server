import { URL_REGEX } from './constants'

export const URL_SCHEMA = {
  type: String,
  required: true,
  validate: {
    validator (value) {
      return URL_REGEX.test(value)
    },
    message: 'Wrong URL provided'
  }
}
