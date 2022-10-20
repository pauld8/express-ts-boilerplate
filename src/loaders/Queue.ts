import kue from 'kue';

import Env from './Env';
import Log from '../middlewares/Log';

class Queue {
  public jobs: any;

  constructor() {
    this.jobs = kue.createQueue({
      prefix: Env.config().redisPrefix,
      redis: {
        port: Env.config().redisHttpPort,
        host: Env.config().redisHttpHost,
        auth: Env.config().redisHttpPassword,
        db: Env.config().redisDB,
      },
    });

    this.jobs
      .on('job enqueue', (_id: any, _type: any) =>
        Log.info(`Queue :: #${_id} Processing of type '${_type}'`)
      )
      .on('job complete', (_id: any) => this.removeProcessedJob(_id));
  }

  public dispatch(_jobName: string, _args: object, _callback: Function): void {
    this.jobs.create(_jobName, _args).save();

    this.process(_jobName, 3, _callback);
  }

  private removeProcessedJob(_id: any): void {
    Log.info(`Queue :: #${_id} Processed`);

    // kue.Job.get(_id, (_err, _job) => {
    //   if (_err) {
    //     return;
    //   }

    //   _job.remove((_err: any) => {
    //     if (_err) {
    //       throw _err;
    //     }

    //     Log.info(`Queue :: #${_id} Removed Processed Job`);
    //   });
    // });
  }

  private process(_jobName: string, _count: number, _callback: Function): void {
    this.jobs.process(_jobName, _count, async (_job: any, _done: any) => {
      await _callback(_job.data);

      _done();
    });
  }
}

export default new Queue();
