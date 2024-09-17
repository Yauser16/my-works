

const jsonServer = require("json-server");
// const https = require("https");
// const path = require("path");
// const fs = require("fs");
const pause = require('connect-pause'); 

const server = jsonServer.create();
const router = jsonServer.router('weather.json');
const middlewares = jsonServer.defaults();

const checkSecretKey = (req, res, next) => {
  if (!req.query.secretKey || req.query.secretKey !== 'YaUseR') {
    return res.status(403).send('Secret key is missing or incorrect');
  }
  next();
}


server.use(middlewares);
server.use(checkSecretKey);


server.use(jsonServer.bodyParser)


server.use(pause(100));
server.use(router);

// const keyFile = path.join("/etc/ssl/serviceserver.teststudyweb.ru_le1.crtkey");
// const certFile = path.join("/etc/ssl/serviceserver.teststudyweb.ru_le1.crt");

// https
//   .createServer(
//     {
//         key: fs.readFileSync(keyFile),
//         ca: fs.readFileSync("/etc/ssl/serviceserver.teststudyweb.ru_le1.cacrt"),
//         cert: fs.readFileSync(certFile),
//     },
//     server
//   )
server.listen(3030, () => {
    console.log(
      'Go to http://81.90.180.43:3030/'
    );
  });