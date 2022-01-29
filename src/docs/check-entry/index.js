import { checkEntriesTag } from '../tags.js'
import { checkEntryIdParameter, tagsParameter } from './parameters.js'
import {
  createCheckEntryRequestBodySchema,
  createCheckEntryResponseBodySchema,
  getCheckEntryResponseSchema,
  updateCheckEntryRequestBodySchema,
  updateCheckEntryResponseBodySchema
} from './schema.js'

export const checkEntryEndpointsDocumentation = {
  '/check-entries/': {
    post: {
      tags: [checkEntriesTag.name],
      description: 'Create new check entry, require authentication',

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
    },

    get: {
      tags: [checkEntriesTag.name],
      description: 'Gets user check entries, require authentication',

      parameters: [tagsParameter],

      responses: {
        200: {
          content: {
            'application/json': {
              schema: getCheckEntryResponseSchema
            }
          }
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  },

  '/check-entries/:id': {
    patch: {
      tags: [checkEntriesTag.name],
      description: 'Patch existing check entry, require authentication - updating any array like tags or http headers will replace the whole saved array',

      parameters: [checkEntryIdParameter],

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: updateCheckEntryRequestBodySchema
          }
        }
      },

      responses: {
        200: {
          description: 'Check entry created successfully',
          content: {
            'application/json': {
              schema: updateCheckEntryResponseBodySchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        404: {
          description: 'There is no check entry linked to this id created by you'
        },

        500: {
          description: 'Internal server error'
        }
      }
    },

    delete: {
      tags: [checkEntriesTag.name],
      description: 'Deletes a check entry',

      parameters: [checkEntryIdParameter],

      responses: {
        200: {
          description: 'Check entry deleted successfully'
        },

        400: {
          description: 'Bad Request'
        },

        404: {
          description: 'There is no check entry linked to this id created by you'
        },

        500: {
          description: 'Internal server error'
        }
      }
    }
  }
}
