// const dbCon = require("../config/dbConfig");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const securityKey = "12345@Ra";

// const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const sqlQuery = `select * from user_information where email='${email}'`;
//   await dbCon.query(sqlQuery, async (error, data) => {
//     try {
//       if (data.length === 0) {
//         res.json({
//           status: 400,
//           message: "user not matched",
//         });
//       } else {
//         const sqlQuery1 = `select * from user_information where id='${data[0].id}'`;
//         if (await bcrypt.compare(password, data[0].password)) {
//           await dbCon.query(sqlQuery1, async (error, data1) => {
//             if (data1) {
//               const auth = jwt.sign({ data: data1 }, securityKey);
//               console.log("first");
//               res.json({
//                 status: 200,
//                 message: "Login success",
//                 token: auth,
//               });
//             }
//           });
//         } else {
//           res.json({
//             status: 400,
//             message: "Please check the password",
//           });
//         }
//       }
//     } catch (error) {
//       res.json({
//         status: 400,
//         message: error,
//       });
//     }
//   });
// };

// const userSignup = async (req, res) => {
//   const { username, email, password } = req.body;
//   const salt = await bcrypt.genSalt(10);
//   const hashpwd = await bcrypt.hash(password, salt);
//   const values = [username, email, hashpwd];

//   const sqlQuery = `select * from user_information where email='${email}'`;
//   const sqlQuery1 = `insert into user_information(username,email,password) values('${username}' , '${email}' , '${hashpwd}')`;
//   await dbCon.query(sqlQuery, async (error, data) => {
//     try {
//       if (data.length > 0) {
//         res.status(400).json({
//           status: 400,
//           message: "User already exist",
//         });
//       }
//       if (data.length === 0) {
//         await dbCon.query(sqlQuery1, [values], (error, data1) => {
//           if (data1) {
//             res.json({
//               status: 200,
//               data: data1,
//               message: `Sucessfully ${username} Registred`,
//             });
//           } else {
//             res.status(400).json({
//               status: 400,
//               message: error,
//             });
//           }
//         });
//       }
//     } catch (error) {
//       res.status(400).json({
//         status: 400,
//         message: error,
//       });
//     }
//   });
// };

// module.exports = { userSignup, userLogin };

const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const securityKey = "12345@Ra";
const tableName = "user_information_80001_7788"; // This is your specific table name

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const { results } = await db
    .prepare(`SELECT * FROM ${tableName} WHERE email = ?;`)
    .bind(email)
    .all();

  if (results.length === 0) {
    res.json({
      status: 400,
      message: "user not matched",
    });
  } else {
    if (await bcrypt.compare(password, results[0].password)) {
      const auth = jwt.sign({ data: results[0] }, securityKey);
      res.json({
        status: 200,
        message: "Login success",
        token: auth,
      });
    } else {
      res.json({
        status: 400,
        message: "Please check the password",
      });
    }
  }
};

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(password, salt);

  const { results } = await db
    .prepare(`SELECT * FROM ${tableName} WHERE email = ?;`)
    .bind(email)
    .all();

  if (results.length > 0) {
    res.json({
      status: 400,
      message: "User already exists",
    });
  } else {
    try {
      const { meta: insert } = await db
        .prepare(
          `INSERT INTO ${tableName} (username, email, password) VALUES (?, ?, ?);`
        )
        .bind(username, email, hashpwd)
        .run();

      await insert.txn.wait();

      res.json({
        status: 200,
        message: `Successfully registered ${username}`,
      });
    } catch (error) {
      res.json({
        status: 400,
        message: error,
      });
    }
  }
};

module.exports = { userSignup, userLogin };
