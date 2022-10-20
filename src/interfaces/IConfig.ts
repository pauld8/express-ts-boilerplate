interface IConfig {
  development: boolean;
  port: any;
  mongoUrl: any;
  mongoEnabled: any;
  sqlUser: any;
  sqlPassword: any;
  sqlDbName: any;
  sqlHost: any;
  sqlPort: any;
  sqlEnabled: any;
  apiPrefix: any;
  isCORSEnabled: any;
  appUrl: any;
  maxUploadLimit: any;
  maxParameterLimit: any;
  redisPrefix: any;
  redisHttpPort: any;
  redisHttpHost: any;
  redisHttpPassword: any;
  redisDB: any;
  queueMonitor: any;
  queueMonitorHttpPort: any;
  webEnabled: any;
  jwtSecret: any;
  jwtExpire: any;
}

export default IConfig;
