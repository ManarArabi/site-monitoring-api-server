import { checkEntriesTag } from '../tags.js'
import { createCheckEntryRequestBodySchema, createCheckEntryResponseBodySchema } from './schema.js'

export const checkEntryEndpointsDocumentation = {
  '/check-entries/': {
    post: {
      tags: [checkEntriesTag.name],
      description: 'Create new check entry',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createCheckEntryRequestBodySchema
          }
        }
      },

      responses: {
        201: {
          description: 'Check entry created successfully',
          content: {
            'application/json': {
              schema: createCheckEntryResponseBodySchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        500: {
          description: 'Internal server error'
        }
      }

    }
  }
}
