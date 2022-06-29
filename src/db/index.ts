import dbConfig from './db.config';
import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'development') {
  let counter = 0;
  mongoose.set(
    'debug',
    (collectionName: any, method: any, query: any, doc: any) => {
      console.log('\x1b[1m', `\ncounter: ${counter}`);
      console.log(
        '\x1b[36m%s',
        `${`collection: ${collectionName}`}\n${`method: ${method}`}`,
      );
      console.log('\x1b[0m', JSON.stringify(query), doc);
      counter += 1;
    },
  );
}

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
};

export default db;
