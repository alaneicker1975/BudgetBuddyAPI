export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'BudgetBuddy API',
      description: 'Powered by Node.js and PosgreSQL.',
      contact: {
        name: 'Alan Eicker',
        email: 'alaneicker@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Local',
      },
    ],
    supportedSubmitMethods: ['get'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.yaml'],
};
