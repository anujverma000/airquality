import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "@/components/SwaggerUI";

export const dynamic = "force-dynamic";

export default async function ApiDocPage() {
  const spec = await getApiDocs();
  return (
    <main className="px-4 sm:px-20">
      <ReactSwagger spec={spec} />
    </main>
  );
}

export const metadata = {
  title: "API Documentation",
  description: "Swagger UI for the Air Quality API",
  slug: "/api-docs",
  date: "2022-01-01",
  type: "page",
};