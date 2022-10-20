import { Sequelize } from 'sequelize';

import Env from './Env';
import Log from '../middlewares/Log';

import initModels from '../models';

export class Mssql {
  public static _client: Sequelize;

  public static async init(): Promise<any> {
    const user = Env.config().sqlUser;
    const password = Env.config().sqlPassword;
    const database = Env.config().sqlDbName;
    const host = Env.config().sqlHost;
    const port = Env.config().sqlPort;

    Mssql._client = new Sequelize({
      host: host,
      database: database,
      username: user,
      password: password,
      port: port,
      logging: (msg) => Log.database(msg),
      dialect: 'mssql',
      dialectOptions: {
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      },
    });

    try {
      await this._client.authenticate();
      Log.database('Mssql :: Connected successfully...');
    } catch (error) {
      Log.database(`Mssql :: Error connecting (${error.message})...`);
    }

    initModels(Mssql._client);
  }

  static get client(): Sequelize {
    return Mssql._client;
  }
}

export default Mssql;
