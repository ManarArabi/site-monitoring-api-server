export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Site monitoring api endpoints Documentation',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'API for users in the system'
    },
    {
      name: 'Check entries',
      description: 'API for check entries in the system'
    }
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
}
