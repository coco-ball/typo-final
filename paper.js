// Set up Paper.js
paper.install(window);
paper.setup(document.getElementById("myCanvas"));

paper.view.viewSize = new Size(window.innerWidth, window.innerHeight);

// Create a new path once, when the script is executed:
var myPath = new Path();
myPath.strokeColor = "black";

// This function is called whenever the user
// clicks the mouse in the view:
function onMouseDown(event) {
  // Add a segment to the path at the position of the mouse:
  myPath.add(event.point);
  console.log("You pressed the mouse!");
}
