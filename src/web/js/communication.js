Communication = function() {
  var socket = io();
  var socketStateText = document.getElementById("socket-state");

  socket.on('connect', function(){
    socketStateText.innerHTML = "Connected";
  });
  socket.on('disconnect', function () {
    socketStateText.innerHTML = "Disconnected";
  });
  return socket;
};