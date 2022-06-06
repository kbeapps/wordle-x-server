import * as dotenv from 'dotenv';
dotenv.config();

export default {
  url:
    process.env.NODE_ENV === 'development'
      ? process.env.TEST_DB_URL
      : process.env.DEV_DB_URL,
};
