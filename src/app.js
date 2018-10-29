const connect = require('connect');
const serveStatic = require('serve-static');

const HPGL = require('./communication/HPGL');
const Communication = require('./communication/Communication');
const Explorer = require('./communication/Explorer');

const hpgl = new HPGL();
hpgl.connect();

const explorer = new Explorer();

const server = connect().use(serveStatic(__dirname + '/web')).listen(8080, function() {
  console.log("Server running on port 8080");
});

const io = require('socket.io')(server);

new Communication(io, hpgl, explorer);