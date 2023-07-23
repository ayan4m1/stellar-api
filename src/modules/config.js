import 'dotenv/config';

export const auth = {
  jwtSecret: process.env.STEL_AUTH_JWT_SECRET
};

export const logging = {
  level: process.env.STEL_LOG_LEVEL || 'info',
  timestampFormat: process.env.STEL_LOG_TIME_FMT
};

export const mongo = {
  uri: process.env.STEL_MONGO_URI
};

export const http = {
  port: parseInt(process.env.STEL_HTTP_PORT || '8080', 10),
  corsOrigin: process.env.STEL_HTTP_CORS_ORIGIN
};

export const site = {
  name: process.env.STEL_SITE_NAME || 'Stellar'
};
