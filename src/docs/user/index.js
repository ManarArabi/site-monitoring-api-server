import { usersTag } from '../tags.js'
import { createUserResponseBodySchema, createUserRequestBodySchema, loginUserRequestBodySchema, loginUserResponseBodySchema } from './schema.js'

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
  },

  '/users/login': {
    post: {
      tags: [usersTag.name],
      description: 'Login user',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: loginUserRequestBodySchema
          }
        }
      },

      responses: {
        200: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: loginUserResponseBodySchema
            }
          }
        },

        400: {
          description: 'Bad Request'
        },

        401: {
          description: 'Wrong email or password'
        },

        404: {
          description: 'There is no user with this email'
        },

        500: {
          description: 'Internal server error'
        }
      }

    }
  }
}
