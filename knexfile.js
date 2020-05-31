module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: 'postgres://xwvjwquj:qav8VzSCp5-82a70hJohHiBy_6N6wQum@rajje.db.elephantsql.com:5432/xwvjwquj', 
    useNullAsDefault: true,
    "pool": {
      "min":0,
      "max":10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
    }
};

