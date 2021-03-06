require('dotenv').config();
const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test', 'staging'])
    .required(),
  PORT: joi.number().default(8080),
  DATABASE: joi.string().default('sms_db'),
  TEST_DB: joi.string().default('sms_test_db'),
  DATABASE_DIALECT: joi.string().default('postgres'),
  DATABASE_PASSWORD: joi.string().default(null),
  HOST: joi.string().default('localhost'),
  DATABASE_URL: joi.string().default(null),
  DATABASE_PORT: joi.string().default(5432)
})
  .unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}


const config = {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT,
  dbName: envVars.DATABASE,
  testDbName: envVars.TEST_DB,
  databaseDialect: envVars.DATABASE_DIALECT,
  dbPassword: envVars.password,
  host: envVars.HOST,
  databaseUrl: envVars.DATABASE_URL,
  databasePort: envVars.DATABASE_PORT
};

module.exports = config;

