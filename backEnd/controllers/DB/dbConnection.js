const mysql = require("mysql");
const dbinfo = require("./dbinfo");
const con = mysql.createConnection({
  host: dbinfo.host,
  port: dbinfo.port,
  user: dbinfo.user,
  password: dbinfo.Password,
  database: dbinfo.database
});
function connect() {
  const connectPromise = new Promise((resolve, reject) => {
    if (con.state === "disconnected") {
      con.connect(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
  return connectPromise;
}
function sqlQuery(qur) {
  const queryPromis = new Promise((resolve, reject) => {
    connect()
      .then(() => {
        con.query(qur, (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
  return queryPromis;
}
module.exports = {
  connect,
  sqlQuery
};
