HpglSender = function (socket, hpglViewer) {
  // Safety checks
  if (typeof window.FileReader !== 'function') {
    throw new Error('FileReader API not supported');
  }

  var uploadPrintBtn = document.getElementById("hpgl-upload-print");
  var cancelBtn = document.getElementById("hpgl-upload-cancel");
  var fileInput = document.getElementById("hpgl-upload-input");
  var hpglForm = document.getElementById("hpgl-form");
  var hpglInput = document.getElementById("hpgl-input");
  var hpglFolderInput = document.getElementById("hpgl-folder-input");
  var hpglFolderForm = document.getElementById("hpgl-folder-form");
  var hpglFolderSelect = document.getElementById("hpgl-folder-files");
  var hpglFolderPreview = document.getElementById("hpgl-folder-preview");
  var hpglFolderPrint = document.getElementById("hpgl-folder-print");

  var currentUploadedText;

  hpglForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var hpglMsg = hpglInput.value;
    socket.emit('hpgl.write', {msg: hpglMsg});
    hpglViewer.draw(hpglMsg);
  });

  fileInput.addEventListener("change", function (e) {
    e.preventDefault();
    var file = fileInput.files[0];
    if (!file) {
      alert('Select a file');
      return;
    }
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      currentUploadedText = e.target.result;
      hpglViewer.draw(e.target.result);
    };
    fileReader.readAsText(file);
  });

  uploadPrintBtn.addEventListener("click", function(e) {
    if(!currentUploadedText) {
      alert('You have to upload a file first');
      return;
    }

    if(confirm("Certo ?")) {
      socket.emit("hpgl.write", {msg: currentUploadedText});
    }
  });

  hpglFolderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    localStorage.setItem("hpglPath", hpglFolderInput.value);
    socket.emit('hpgl.setPath', {path: hpglFolderInput.value});
  });

  cancelBtn.addEventListener("click", function(e) {
    socket.emit('hpgl.cancel');
  });

  if(localStorage.getItem("hpglPath")) {
    hpglFolderInput.value = localStorage.getItem("hpglPath");
    // hpglFolderForm.querySelector("button[type='submit']").trigger('click');
    var evt = new Event("submit");
    hpglFolderForm.dispatchEvent(evt);
  }

  socket.on('hpgl.listFiles', function (payload) {
    hpglFolderSelect.innerHTML = "";
    payload.files.forEach(function (file) {
      var option = document.createElement("option");
      var fileFolders = file.split('/');
      option.value = file;
      option.innerHTML = fileFolders[fileFolders.length - 2] + "/" + fileFolders[fileFolders.length - 1];
      hpglFolderSelect.appendChild(option);
    });
  });

  hpglFolderPreview.addEventListener('click', function (e) {
    if (hpglFolderSelect.selectedIndex < 0) {
      alert("No option selected. Maybe do a scan before ?");
      return;
    }
    var file = hpglFolderSelect.options[hpglFolderSelect.selectedIndex].value;
    socket.emit('file.getContent', {file: file});
  });

  hpglFolderPrint.addEventListener('click', function (e) {
    if (hpglFolderSelect.selectedIndex < 0) {
      alert("No option selected. Maybe do a scan before ?");
      return;
    }

    if (confirm('Certo ?')) {
      var file = hpglFolderSelect.options[hpglFolderSelect.selectedIndex].value;
      socket.emit('hpgl.printFile', {file: file});
    }
  });

  hpglFolderSelect.addEventListener("dblclick", function(e) {
    hpglFolderPreview.dispatchEvent(new Event("click"));
  });

  socket.on('hpgl.preview', function (payload) {
    hpglViewer.draw(payload.content);
  });
};