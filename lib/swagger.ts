import { createSwaggerSpec } from "next-swagger-doc";
import fs from "fs/promises";
import path from "path";

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
  const specPath = path.join(process.cwd(), "public", "swagger.json");
  const specContent = await fs.readFile(specPath, "utf8");
  return JSON.parse(specContent);
};
