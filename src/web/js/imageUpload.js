// ImageUpload = function() {
//   // Safety checks
//   if(typeof window.FileReader !== 'function') {
//     throw new Error('FileReader API not supported');
//   }
//
//   var uploadBtn = document.getElementById("upload-btn"),
//       fileInput = document.getElementById("upload-input"),
//       canvas = document.getElementById("canvas"),
//       ctx = canvas.getContext("2d");
//
//   uploadBtn.addEventListener("click", function(e) {
//     e.preventDefault();
//     var file = fileInput.files[0];
//     if(!file) {
//       alert('Select a file');
//       return;
//     }
//     var fileReader = new FileReader();
//     fileReader.onload = createImage;
//     fileReader.readAsDataURL(file);
//   });
//
//   function createImage(e) {
//     var img = new Image();
//     img.onload = onImageLoaded;
//     img.src = e.target.result;
//   }
//
//   function onImageLoaded(e) {
//     var img = e.path[0];
//     ctx.filter = "grayscale(100%)";
//     ctx.drawImage(img, 0, 0, 500, 627);
//   }
// };