import type { Knex } from 'knex';

const env = process.env.NODE_ENV;

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mssql',
    connection: {
      user: 'SA',
      password: 'Password1234!',
      database: 'ichilov_bi',
      server: '127.0.0.1',
      port: 1433,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    migrations: {
      tableName: 'migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mssql',
    connection: {
      user: 'SA',
      password: 'Password1234!',
      database: 'ichilov_bi',
      server: 'mssql',
      port: 1433,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};

module.exports = config;
