// Navigation = function () {
//   var links = document.getElementById("navigation").querySelectorAll('a');
//   var panes = document.querySelectorAll('.pane');
//
//   hidePanes();
//   showPane(links[0]);
//
//   links.forEach(function (link) {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       showPane(e.target);
//     })
//   });
//
//   function showPane(linkElmt) {
//     hidePanes();
//     removeActiveLinks();
//     var elmt = document.getElementById(linkElmt.getAttribute("data-target"));
//     if(!elmt) {
//       return;
//     }
//     elmt.classList.remove("hidden");
//     linkElmt.classList.add("active");
//   }
//
//   function hidePanes() {
//     panes.forEach(function (pane) {
//       pane.classList.add("hidden");
//     });
//   }
//
//   function removeActiveLinks() {
//     links.forEach(function(link) {
//       link.classList.remove("active");
//     });
//   }
// };