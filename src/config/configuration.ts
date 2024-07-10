import * as dotenv from 'dotenv';
dotenv.config();

export default {
  databaseConfig: {
    db_host: process.env.DATABASE_HOST,
    db_name: process.env.DATABASE,
    db_username: process.env.DATABASE_USERNAME,
    db_password: process.env.DATABASE_PASSWORD,
    redis_url: process.env.REDIS_URL,
  },
  app: {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  },
};
