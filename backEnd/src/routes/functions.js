const dbFunctions = require("../../controllers/DB/dbConnection");
const jwt = require("jsonwebtoken");

function checkIfUserExist(email) {
  console.log("in fucntion ", email);
  let SearchQuery = `SELECT * FROM users WHERE email = '${email}'`;
  return new Promise((resolve, reject) => {
    dbFunctions
      .sqlQuery(SearchQuery)
      .then(rs => {
        if (rs[0]) {
          resolve("true");
        } else {
          console.log(email);
          resolve("false");
        }
      })
      .catch(err => {
        reject(err);
      });
  });
  // return userStatus;
}
function makeAToken(email) {
  // return crypto.randomBytes(16).toString("hex");
  const token = jwt.sign({ email: email }, "RANDOM_TOKEN_SECRET", {
    expiresIn: "24h"
  });
  console.log("token is : ", token);
  return token;
}
function checkIfUserVerified(userEmail) {
  const userEmailVerifyCheckQuery = `SELECT * FROM users WHERE email='${userEmail}' AND isverified = true`;
  const userVerification = new Promise((resolve, reject) => {
    dbFunctions
      .sqlQuery(userEmailVerifyCheckQuery)
      .then(reply => {
        if (reply[0]) {
          resolve("true");
        } else {
          resolve("false");
        }
      })
      .catch(err => reject(err));
  });
  console.log(userVerification);
  return userVerification;
}

function deleteTocken(email) {
  let deleteTockenQuery = `DELETE FROM token WHERE email = '${email}'`;
  dbFunctions
    .sqlQuery(deleteTockenQuery)
    .then(result => console.log(result))
    .catch(err => console.log(err));
}
module.exports = {
  checkIfUserExist,
  makeAToken,
  checkIfUserVerified,
  deleteTocken
};
