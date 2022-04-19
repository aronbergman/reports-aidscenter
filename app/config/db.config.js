require("dotenv").config();
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_TYPE } =
  process.env;

module.exports = {
  HOST: "localhost",
  USER: DATABASE_USER,
  PASSWORD: DATABASE_PASSWORD,
  DB: DATABASE_NAME,
  dialect: DATABASE_TYPE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
