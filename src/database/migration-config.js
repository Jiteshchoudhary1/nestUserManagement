// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const databaseConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: 'postgres',
  },
};
module.exports = databaseConfig;
