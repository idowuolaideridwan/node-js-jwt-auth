module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "nea_superuser",
  dialect: "mysql",
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000
  }
};
