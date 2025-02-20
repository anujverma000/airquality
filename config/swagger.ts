import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Air Quality API',
      version: '1.0.0',
      description: 'API for air quality data analysis',
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Local server' },
      { url: 'https://airquality-anuj.vercel.app/api', description: 'Production server' },
    ],
  },
  apis: ['./app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);