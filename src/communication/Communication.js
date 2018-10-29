const io = require('socket.io')();

class Communication {
  constructor(io, hpgl, explorer) {
    io.on('connection', function(client) {
      client.on('hpgl.write', (payload) => {
        console.log('Received HPGL: ', payload.msg);
        if(!payload.msg) {
          console.error('No payload.msg, ignoring');
          return;
        }
        hpgl.write(payload.msg);
      });

      client.on('hpgl.setPath', function(payload) {
        explorer.listFiles(payload.path);
        setTimeout(() => {
          client.emit('hpgl.listFiles', {files: explorer.getFiles()});
        }, 300);
      });

      client.on('file.getContent', function(payload) {
        const content = explorer.getFileContent(payload.file);
        client.emit('hpgl.preview', {content});
      });

      client.on('hpgl.printFile', function(payload) {
        const content = explorer.getFileContent(payload.file);
        hpgl.write(content);
      });

      client.on('hpgl.cancel', function() {
        // hpgl.flush();
      });
    });
  }
}

module.exports = Communication;