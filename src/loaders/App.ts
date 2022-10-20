import kue from 'kue';

import Express from './Express';

import Env from './Env';
import Log from '../middlewares/Log';
import { Database } from './Database';
import Mssql from './Mssql';

class App {
  // Clear the console
  public clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  // Loads your Server
  public loadServer(): void {
    Log.info('Server :: Booting @ Master...');

    Express.init();
  }

  // Loads the Database Pool
  public loadDatabase(): void {
    const mongoEnabled: boolean = Env.config().mongoEnabled;

    if (mongoEnabled) {
      Log.info('Mongo Database :: Booting @ Master...');
      Database.init();
    }

    return;
  }

  // Loads the Database Pool
  public loadMssql(): void {
    const isMssqlEnabled: boolean = Env.config().sqlEnabled;

    if (isMssqlEnabled) {
      Log.info('Mssql :: Booting @ Master...');
      Mssql.init();
    }

    return;
  }

  // Loads the Queue Monitor
  public loadQueue(): void {
    const isQueueMonitorEnabled: boolean = Env.config().queueMonitor;
    const queueMonitorPort: number = Env.config().queueMonitorHttpPort;
    if (isQueueMonitorEnabled) {
      kue.app.listen(queueMonitorPort);
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`
      );
    }
  }
}

export default new App();
