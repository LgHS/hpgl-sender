const SerialPort = require('serialport');
const repl = require('repl');

let buffer = "";

class HPGL {
  constructor() {
    this.buffer = "";
    this.port = new SerialPort('/dev/ttyUSB0', {
      baudRate: 9600,
      dataBits: 7,
      parity: "even",
      stopBits: 1,
      rtscts: true
    });
  }

  connect() {
    const self = this;

    this.port.on('open', function() {
      console.log("port opened");

      self.replServer = repl.start({
        prompt: "> ",
        useColors: true
      });
      self.replServer.context.port = self.port;
    });

    this.port.on( "data", function( chunk ) {
      buffer += chunk.toString();
      if(Buffer.compare(chunk, new Buffer(["27"]))) {
        console.log(buffer);
        self.buffer = "";
        self.replServer.displayPrompt('> ');
      }
    });

    this.port.on('error', function(err) {
      console.error('Could not open serial port', err.message);
    });
  }

  write(msg) {
    this.port.write(msg);
  }
}

module.exports = HPGL;
