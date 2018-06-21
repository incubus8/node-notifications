module.exports = {
  development: {
    client: 'pg',
    debug: process.env.KNEX_DEBUG,
    connection: {user: 'angel', database: 'angel'}
  },
  production: {
    client: 'pg',
    debug: process.env.KNEX_DEBUG,
    connection: process.env.POSTGRES_URL
  }
};
