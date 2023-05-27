export const config = {
  port: process.env.PORT || 3000,
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "password",
  dbName: process.env.DB_NAME || "cocktails",
  dbHost: process.env.DB_HOST || "localhost",
};
