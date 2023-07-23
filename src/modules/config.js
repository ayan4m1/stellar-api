import 'dotenv/config';

export const logging = {
  level: process.env.STEL_LOG_LEVEL || 'info',
  timestampFormat: process.env.STEL_LOG_TIME_FMT
};

export default {
  logging
};
