import mysql from "mysql2";
import "dotenv/config";
import fs from 'fs';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  PORT: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
  ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
});

export default connection;