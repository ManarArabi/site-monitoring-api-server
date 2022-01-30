import Joi from 'joi'

export const reportsValidation = {
  getAvailabilityReport: {
    query: {
      checkEntryId: Joi.string(),
      tags: Joi.array().items(Joi.string()).min(1).single()
    }
  }
}
