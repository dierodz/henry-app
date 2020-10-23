//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const colors = require("colors/safe");
const { server } = require("./app.js");
const { conn, createRoles } = require("./db.js");
const { PORT, DB_HOST } = process.env;

// Syncing all the models at once.

conn.sync({ force: false /* alter: true */ }).then(() => {
   createRoles().then(() => {
      server.listen(PORT, () => {
         console.log(
            `%s listening at port ${colors.brightYellow(
               `http://${DB_HOST}:${PORT}/graphql`
            )}`
         );
      });
   });
});
