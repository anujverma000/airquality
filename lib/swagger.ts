import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Air Quality API',
        version: '1.0.0',
        description: 'API for air quality data analysis',
      },
      servers: [
        { url: 'https://airquality-anuj.vercel.app/api', description: 'Production server' },
        { url: 'http://localhost:3000/api', description: 'Local server' },
      ],
    },
    apiFolder: 'app/api',
  });
  return spec;
};
