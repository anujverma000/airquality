import SwaggerDocs from '@/components/SwaggerUI';
import { getApiDocs } from '@/lib/swagger';

export const dynamic = 'force-dynamic';

const Docs = () => {
  const spec = getApiDocs();
  return (
    <main className="px-4 sm:px-20">
      <SwaggerDocs spec={spec} />
    </main>
  );
}

export default Docs;