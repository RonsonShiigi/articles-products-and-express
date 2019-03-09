// Update with your config settings.
require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  seeds: {
    directory: "./seeds"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};

//   client: "pg",
//   development: {
//     client: "pg",
//     connection: {
//       port: (process.env.POSTGRES_HOST_PORT = 8765),
//       database: process.env.POSTGRES_DB,
//       user: process.env.POSTGRES_USER,
//       password: process.env.POSTGRES_PASSWORD
//     }
//   },

//   staging: {
//     client: "pg",
//     connection: {
//       database: "my_db",
//       user: "username",
//       password: "password"
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: "knex_migrations"
//     }
//   },

//   production: {
//     client: "pg",
//     connection: {
//       database: "my_db",
//       user: "username",
//       password: "password"
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: "knex_migrations"
//     }
//   }
// };
