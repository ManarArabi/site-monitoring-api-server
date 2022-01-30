import { tagsParameter } from '../check-entry/parameters.js'
import { reportsTag } from '../tags.js'
import { checkEntryIdParameter } from './parameters.js'
import { getAvailabilityReportResponseSchema } from './schema.js'

export const reportEndpointsDocumentation = {
  '/reports/': {
    get: {
      tags: [reportsTag.name],
      description: 'get availability report',

      parameters: [checkEntryIdParameter, tagsParameter],

      responses: {
        200: {
          content: {
            'application/json': {
              schema: getAvailabilityReportResponseSchema
            }
          }
        },

        404: {
          description: 'Not logs found for the provided data'
        },

        500: {
          description: 'Internal server error'
        }
      }

    }
  }
}
