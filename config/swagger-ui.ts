export async function getSwaggerUi() {
  return {
    getHtml: (options: { spec: any }) => {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css">
          </head>
          <body>
            <div id="swagger-ui"></div>
            <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
            <script>
              window.onload = () => {
                SwaggerUIBundle({
                  spec: ${JSON.stringify(options.spec)},
                  dom_id: '#swagger-ui',
                  presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.SwaggerUIStandalonePreset
                  ]
                })
              }
            </script>
          </body>
        </html>
      `;
    }
  };
}