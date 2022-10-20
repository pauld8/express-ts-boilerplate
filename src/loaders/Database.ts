import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { MongoError } from 'mongodb';

import Env from './Env';
import Log from '../middlewares/Log';

export class Database {
  // Initialize your database pool
  public static init(): any {
    const dsn = Env.config().mongoUrl;

    (<any>mongoose).Promise = bluebird;

    mongoose.connect(dsn, {}, (error: MongoError) => {
      // handle the error case
      if (error) {
        Log.info('Failed to connect to the Mongo server!!');
        console.log(error);
        throw error;
      } else {
        Log.info('Connected to mongo server at: ' + dsn);
      }
    });
  }
}

export default mongoose;
