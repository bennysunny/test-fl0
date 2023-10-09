import pg from "pg";
import fs from "fs";

const pool = new pg.Pool({
  connectionString: "postgres://fl0user:LHIp0AkQDn2s@ep-jolly-lake-27381692.ap-southeast-1.aws.neon.fl0.io:5432/fldb?sslmode=require",
});

export const bootstrap = async () => {
    let res = {}; 
    try {
        res = await query("SELECT * from contacts");
    } catch (error) {
    }
  if (!res.rowCount) {
    console.log("Bootstrapping database");
    const schema = fs.readFileSync("db/schema.sql");
    await query(schema.toString("utf-8"));
  }
};

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};