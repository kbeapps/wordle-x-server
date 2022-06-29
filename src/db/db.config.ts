import * as dotenv from 'dotenv';
dotenv.config();

export default {
  url:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DB_URL
      : process.env.LOCAL_DB_URL,
};
