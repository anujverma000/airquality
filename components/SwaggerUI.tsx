import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerDocs = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export default SwaggerDocs;