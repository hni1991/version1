const express = require("express");
// const crypto = require("crypto");
const dbFunctions = require("../../controllers/DB/dbConnection");
const emailSender = require("../../controllers/email/emailSender");
const path = require("path");
const {
  checkIfUserExist,
  checkIfUserVerified,
  deleteTocken,
  makeAToken
} = require("./functions");
// // const multer = require('multer');
// const multer = require("multer");

// const multerStore = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, callback) {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
//   fileFilter: function(req, file, cb) {
//     var filetypes = /jpeg|jpg/;
//     var mimetype = filetypes.test(file.mimetype);
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(
//       "Error: File upload only supports the following filetypes - " + filetypes
//     );
//   }
// });
// const upload = multer({ storage: multerStore });

// ///////// M U L T E R
// const bcrypt = require("bcrypt");
// const path = require("path");
// // var expressValidator = require('express-validator');
// const { check, validationResult } = require("express-validator");
// // const assert = require('assert');
// //const dbCheck = require("../controllers/dbController");
// const postHandler = require("../controllers/postHandler");
const router = express.Router();
// router.use("/myblog.html", upload.single("newImage", 10));
// router.use("/userupdate", upload.single("newphoto", 10));

// const mailSender = require("../controllers/emailSender");

// // preparing for uploading fotos
router.use(express.urlencoded({ extended: false }));
// //router.use(expressValidator);

// // support parsing of application/json type post data
router.use(express.json());

// var sess;
router.route("/").get((req, res) => {
  res.sendFile("./index.html");
});
// router.route("/index").get((req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// // router.route('/register').get((req, res) => {
// //     res.render('register', { message: '' });
// // });
// router.route("/register").get((req, res) => {
//   res.redirect(__dirname + "/register.html");
// });
router.route("/register").post((req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let password = req.body.password;
  let date = Date.now();

  let phoneNumber = req.body.phoneNumber || "";
  let city = req.body.city || "";
  let postCode = req.body.postcode || 0;
  let street = req.body.street || "";
  let houseNumber = req.body.houseNumber || "";
  let area = req.body.area;

  let gender = req.body.gender || "";

  let InsertQuery = `INSERT INTO users  (name,lastname,email,password,dateOfRegisteration,telephone,city,postCode,street,houseNumber,area,gender) VALUES ('${firstName}',' ${lastName}','${email}','${password}','${date}','${phoneNumber}','${city}',${postCode},'${street}','${houseNumber}','${area}','${gender}')`;
  checkIfUserExist(email)
    .then(reply => {
      if (reply === "false") {
        dbFunctions
          .sqlQuery(InsertQuery)
          .then(result => {
            let token = makeAToken(email);
            let date = Date.now();
            let tokenQuery = `INSERT INTO token (token,date,email) VALUES ('${token}','${date}','${email}')`;
            // if you saved it try to  make a token and save it with the email in a token database
            dbFunctions
              .sqlQuery(tokenQuery)
              .then(result => {
                //sending the email here
                let fromEmail = "test100zargar@gmail.com";
                emailSender.sendEmail(
                  email,
                  fromEmail,
                  "confirmation Email",
                  "Hello,\n\n" +
                    "Please verify your account by clicking the link: \nhttp://" +
                    req.headers.host +
                    "/confirmation/?tk=" +
                    token +
                    "&email=" +
                    email +
                    ".\n"
                );
                res.json({ message: "email sent" });
              })
              .catch(err => {
                res.json(err);
              });
          })
          .catch(err => res.json({ err }));
      } else if (reply === "true") {
        // now the use exists. we look if verified or not?
        checkIfUserVerified(email).then(response => {
          if (response === "true") {
            res.json({ message: "you have already registerd ...forget pass?" });
          } else if (response === "false") {
            res.json({ message: "again token?" });
          }
        });
      } else {
        res.json(reply);
      }
    })
    .catch(err => {
      res.json(err);
    });
});
router.route("/confirmation").get((req, res) => {
  //res.send({ email: req.query.email, token: req.query.tk });
  let token = req.query.token;
  let email = req.query.email;
  checkIfUserExist(email).then(response => {
    console.log("response is : ", response);
    if (response === "false") {
      res.json({
        message:
          "you must first register! there is no such a user as registered"
      });
    }
    if (response === "true") {
      checkIfUserVerified(email)
        .then(reply => {
          console.log("reply is", reply);
          if (reply === "true") {
            res.json({ message: "this user has already verified" });
          } else if (reply === "false") {
            let confirmTokenQuery = `SELECT * FROM token WHERE email = '${email}' AND token ='${token}'`;
            dbFunctions
              .sqlQuery(confirmTokenQuery)
              .then(result => {
                let validateQuery = `UPDATE users SET isverified = 1 WHERE email = '${email}'`;
                dbFunctions
                  .sqlQuery(validateQuery)
                  .then(data => {
                    deleteTocken(email);

                    res.send({ message: "db verified" });
                  })
                  .catch(err => {
                    res.send(err);
                  });
              })
              .catch(err => {
                res.json(err);
              });
          } else {
            res.json(reply);
          }
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      res.json(response);
    }

    //dbCheck.confirmEmail(token)
  });
});
router.route("/passwordChangeRequest").post((req, res) => {
  // in this point the frontEnd must show him a form to write his email and then comes here
  let email = req.body.email;
  checkIfUserExist(email).then(result => {
    if (!result[0]) {
      //there is no user you must sign up first
      res.json({ message: "sign up first!" });
    } else if (result[0] && !result[0].isverified) {
      // you have not verified your email . first try to verify your account!
      res.json({ message: "send token again?" });
    } else {
      let token = makeAToken(email);
      let date = Date.now();
      let tokenQuery = `INSERT INTO token (token,date,email) VALUES ('${token}','${date}','${email}')`;
      // if you saved it try to  make a token and save it with the email in a token database
      dbFunctions
        .sqlQuery(tokenQuery)
        .then(result => {
          //sending the email here
          let fromEmail = "test100zargar@gmail.com";
          let emailText =
            "Hello,\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/changepass/?tk=" +
            token +
            "&email=" +
            email +
            ".\n";

          let subject = "request for password changing";
          emailSender.sendEmail(email, fromEmail, subject, emailText);

          res.json({ message: "email sent" });
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
});
router.route("/changepass").get((req, res) => {
  let reqPath = path.join(__dirname, "../../public/changepass.html");
  res.sendFile(reqPath);
});
router.route("/changepassAction").get((req, res) => {
  let email = req.query.email;
  let tocken = req.query.tocken;
  checkIfUserExist(email)
    .then(rs => {
      if (!rs[0]) {
        // there is no user must sign up
        res.json({ message: "you must sign up first" });
      } else {
        // there is a user , check the pass. and update database
        let checkTocken = `SELECT * FROM tocken WHERE email = '${email}' AND  tocken='${tocken}'`;
        dbFunctions
          .sqlQuery(checkTocken)
          .then(result => {
            if (!result[0]) {
              res.json({ message: "no tocken" });
            } else {
              deleteTocken(email);
              let pass1 = req.body.pass1;
              let pass2 = req.body.pass2;
              if (pass1 !== pass2) {
                res.json({ message: "passwords don't match" });
              } else {
                let updatePassQuery = `UPDATE users SET password = '${pass1}' WHERE email = '${email}'`;
                dbFunctions
                  .sqlQuery(updatePassQuery)
                  .then(result => {
                    res.json({ message: "updated" });
                  })
                  .catch(err => {
                    res.json({ message: err });
                  });
              }
            }
          })
          .catch(err => {
            res.json({ message: "data connection error" });
          });
      }
    })
    .catch(err => {
      res.json({ message: err });
    });
});

// function connect() {
//   console.log("in connect in dbConnections");
//   const connectPromise = new Promise((resolve, reject) => {
//     if (con.state === "disconnected") {
//       con.connect(error => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     } else {
//       resolve();
//     }
//   });
//   return connectPromise;
// }

module.exports = router;
// export {router};
