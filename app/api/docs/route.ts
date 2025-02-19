import { swaggerSpec } from '@/config/swagger';
import { getSwaggerUi } from '@/config/swagger-ui';

export async function GET() {
  const swaggerUi = await getSwaggerUi();
  const html = swaggerUi.getHtml({ spec: swaggerSpec });
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}