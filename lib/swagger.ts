/* eslint-disable @typescript-eslint/no-require-imports */

const { createSwaggerSpec } = require("next-swagger-doc");
const fs = require("fs/promises");
const path = require("path");

export const generateSwaggerSpec = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Air Quality API",
        version: "1.0.0",
        description: "API for air quality data analysis",
      },
      servers: [
        { url: "https://airquality-anuj.vercel.app", description: "Production server" },
        { url: "http://localhost:3000", description: "Local server" },
      ],
    },
    apiFolder: "app/api",
  });
  const specPath = path.join(process.cwd(), "public", "swagger.json");
  await fs.writeFile(specPath, JSON.stringify(spec, null, 2), "utf8");

  return spec;
};

export const getApiDocs = async () => {
  if (process.env.NODE_ENV === "production") {
    const specPath = path.join(process.cwd(), "public", "swagger.json");
    const specContent = await fs.readFile(specPath, "utf8");
    return JSON.parse(specContent);
  }
  return await generateSwaggerSpec();
};

// Run this when the script is executed directly
if (require.main === module) {
  generateSwaggerSpec().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}