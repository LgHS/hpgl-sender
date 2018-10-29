/**
 * Escape command in js : "\x1b".
 * Example: port.write("\x1b.O") outputs plotter status (see manual)
 */
const repl = require('repl');
const SerialPort = require('serialport');

let buffer = "";

const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600,
  dataBits: 7,
  parity: "even",
  stopBits: 1,
  rtscts: true
});
port.on("open", () => {
  console.log("port opened");

  const replServer = repl.start({
    prompt: "> ",
    useColors: true
  });


  port.on( "error", function( msg ) {
    console.error("error: " + msg );
  });
  // const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 7}));

// // Switches the port into "flowing mode"
//   port.on('data', function (data) {
//     console.log('Data:', data.toString("ascii"));
//   });
//
// // Read data that is available but keep the stream from entering "flowing mode"
//   port.on('readable', function () {
//     console.log('Data:', port.read());
//   });

  replServer.context.port = port;
});
