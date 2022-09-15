import { Knex, knex } from "knex";
import path from "path";
import Database from 'better-sqlite3';

// export const db = knex({
//   client: "sqlite3",
//   connection: {
//     filename: path.resolve("./databases/hp.db"),
//   },
// });

// const db = new Database('hp.db', 'readonly');

// const getStores = db.prepare('SELECT location FROM hp');
// console.log('stores: ', getStores);
