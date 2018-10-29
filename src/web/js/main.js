// new Navigation();
var socket = new Communication();
// new ImageUpload();
hpglViewer = new HpglViewer({
  container: "canvas",
  canvasWidth: 980, // in px
  machineTravelWidth: 416, // in mm
  machineTravelHeight: 259, // in mm
  machineRatio: 40
});
new HpglSender(socket, hpglViewer);
