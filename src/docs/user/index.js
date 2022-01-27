import { usersTag } from '../tags.js'
import { createUserResponseBodySchema, createUserRequestBodySchema } from './schema.js'

export const userEndpointsDocumentation = {
  '/users/sign-up': {
    post: {
      tags: [usersTag.name],
      description: 'Create new user',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createUserRequestBodySchema
          }
        }
      },

      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: createUserResponseBodySchema
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
