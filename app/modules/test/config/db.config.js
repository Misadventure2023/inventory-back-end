const env = process.env

const config = {
  HOST: env.DB_HOST,
  USER: env.DB_USER,
  PASSWORD: env.DB_PASSWORD,
  DB: env.DB_NAME
}

module.exports = { config }