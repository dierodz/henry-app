const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require("./passport");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./apollo");

const http = require("http");

require("./db.js");

const app = express();

app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Credentials", "true");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
});

const apolloServer = new ApolloServer({
   typeDefs,
   resolvers,
   introspection: true,
   playground: true,
});

apolloServer.applyMiddleware({ app });

app.all("*", function (req, res, next) {
   passport.authenticate("bearer", function (err, user) {
      if (err) return next(err);
      if (user) {
         req.user = user;
      }
      return next();
   })(req, res, next);
});

app.use(passport.initialize());

app.use("/", routes);

// //Vimeo Api
// let Vimeo = require('vimeo').Vimeo;
// let client = new Vimeo("cd76cadcc03e452c4fe561aa8401dcbba33d5f1c", "UMKTV+hzJ/UjgD6JuFZoIM+HuF9YYRPnNwRl7qVKW0zdI8oSun1pS7fwF+zxbvekxns+DZnnWZ1fb2gJIu1QmfI0OTv20hcFoT1iwp6hcRKlM82vSL5H8ruJulpWdphE", "9af52953fb7efad0cd1ce43791d300ce");

// client.request('https://api.vimeo.com/users/112886970/projects/2174805/videos',function (err, json){
//    if(err){
//       console.log(err)
//    }
//    console.log(json)
// })

const server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);

module.exports = { server, apolloServer };
