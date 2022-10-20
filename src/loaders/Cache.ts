import mcache from 'memory-cache';

import express from 'express';

class Cache {
  public cache(_duration: number): any {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      let key = '__express__' + req.originalUrl || req.url;

      let cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
      } else {
        res.sendResponse = res.send;
        // res.send = (body) => {
        //   mcache.put(key, body, _duration * 1000);
        //   res.sendResponse(body);
        // };
        next();
      }
    };
  }
}

export default new Cache();
