import fs from 'fs';
import path from 'path';

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../../docs/swagger.json'),
    'utf-8',
  ),
);

export default swaggerDocument;
