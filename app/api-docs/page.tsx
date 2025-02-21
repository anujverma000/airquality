import { getApiDocs } from '@/lib/swagger';
import SwaggerDocs from '@/components/SwaggerUI';

export default async function ApiDocsPage() {
  const spec = getApiDocs();
  return (
    <main className="px-4 sm:px-20">
      <SwaggerDocs spec={spec} />
    </main>
  );
}