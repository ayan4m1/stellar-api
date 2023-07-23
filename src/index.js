import express from 'express';

import { getLogger } from './modules/logging.js';
import { http } from './modules/config.js';

const app = express();
const log = getLogger('app');

app.listen(http.port, () => log.info(`Listening on port ${http.port}`));
