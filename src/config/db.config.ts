import * as dotenv from 'dotenv';
dotenv.config();

export default {
  url:
    process.env.NODE_ENV === 'development'
      ? process.env.LOCAL_DB_URL
      : process.env.DB_URL,
};
