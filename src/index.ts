import express from 'express';

import { getLogger } from './modules/logging.js';
import { http } from './modules/config.js';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const log = getLogger('app');

// define routes
app.get('/', (req, res) => res.send('API Running'));

// handle any downstream errors
app.use((err: String, res: any) => {
  console.log(err, 'ln 15 index.ts');
  res.status(500).send('Server Error');
});

app.listen(http.port, () => log.info(`Listening on port ${http.port}`));
