import jsonData from "./data/nameratio.json" assert { type: "json" };

let moving = true;
let firstArr = [];
let lastArr = [];
let nameTagArr = [];

// import jsonData from "./data/nameratio.json" assert { type: "json" };

function setup() {
  //   drawGraphic("text");
  //   body = select(".body");
  //   rcnv.parent("body");
  createCanvas(windowWidth, windowHeight);
  drawGraphics();
}

function draw() {}

// function drawGraphic(text) {
//   let shapeArr = ["RECT", "ELLIPSE", "TRIANGLE", "X"];
//   let sizeArr = ["BIG", "SMALL"];
//   let strokeW = getRandomInt(0, 2);
//   let shape = shapeArr[getRandomInt(0, 4)];
//   let size = sizeArr[getRandomInt(0, 2)];
//   let set1 = [text, "COLOR", "WHITE", strokeW, shape, size];
//   let set2 = [text, "COLOR", "NONE", strokeW, shape, size];
//   let set3 = [text, "WHITE", "COLOR", strokeW, shape, size];
//   let set = [set1, set2, set3];

//   this.shape = new Shape(set[getRandomInt(0, 3)]);
//   rcnv = createCanvas(this.shape.s * 12, this.shape.s * 8);
//   this.shape.drawShape();
// }

window.setup = setup;
window.draw = draw;

function drawGraphics() {
  let indexArr = [];
  for (let i = 0; i < 18; i++) {
    indexArr[i] = getRandomInt(0, 18);
  }
  for (let i = 0; i < indexArr.length; i++) {
    nameTagArr[indexArr[i]].drawGraphic();
  }
}

for (let i = 0; i < 100; i++) {
  firstArr.push([jsonData[i].firstname, jsonData[i].firstweight]);
  if (jsonData[i].lastname !== undefined) {
    lastArr.push([jsonData[i].lastname, jsonData[i].lastweight]);
  }
}

let opArr = ["opacity1", "opacity2"];
let blurArr = ["blur1", "blur2", "blur3"];

for (let i = 0; i < 200; i++) {
  const nameTag = new NameTag(firstArr, lastArr);

  const body = document.getElementById("body");
  nameTag.createName();
  nameTag.createSex();
  nameTag.createPhone();
  // nameTag.drawGraphic();
  let o = opArr[getRandomInt(0, opArr.length)];
  let b = blurArr[getRandomInt(0, blurArr.length)];
  body.appendChild(nameTag.createDOMElement(o, b));
  nameTagArr[i] = nameTag;
}

setInterval(() => {
  nameTagArr.forEach((nameTag) => {
    console.log(nameTag.active);
    // console.log(nameTagArr);
    nameTag.toggleState();
  });
}, getRandomInt(1000, 5000)); // Update the class every 1000 milliseconds (1 second)

$(document).ready(function () {
  let nameTags = $(".name");
  initMove();
  moveNameTags(moving);

  // Handle click events on the document body
  $(document.body).on("click", function (event) {
    // Check if the clicked element is not a descendant of an element with the "name-tag" class
    if (!$(event.target).closest(".name-tag").length) {
      // Remove the "focused" class from all elements with the "name-tag" class
      nameTags.removeClass("focused");

      if (!moving) {
        moving = true;
        moveNameTags(moving);
      }
      // moving = !moving;
      // moveNameTags(moving);

      // Check if there is at least one element with the "focused" class
      const hasFocusedElement = nameTags.hasClass("focused");

      // Execute moveNameTags(false) if there is at least one focused element
      if (hasFocusedElement) {
        moving = !moving;
        moveNameTags(false);
      }
    }
  });

  // nameTags = $(".name-tag");
  // Handle click events on elements with the "name-tag" class
  nameTags.on("click", function (e) {
    // Add the "focused" class to the clicked element
    nameTags.removeClass("focused");
    $(this).addClass("focused");
    if (moving) {
      moving = !moving;
      moveNameTags(moving);
    }
    const clickedName = e.target.textContent;
    const contentArr = JamoUtil.split(clickedName);
    const dividedContentArr = contentArr.reduce(function (acc, cur) {
      return acc.concat(cur);
    });
    const combinedString = dividedContentArr.join(" ");
    e.target.textContent = combinedString.replace(/ /g, "");

    const location = {
      x: e.pageX,
      y: e.pageY,
    };

    // drawGraphic(clickedName, location);
  });
});

// function setup() {
//   //   drawGraphic("text");
//   //   body = select(".body");
//   //   rcnv.parent("body");
//   createCanvas(windowWidth, windowHeight);
//   drawGraphic(text);
// }

// function drawGraphic(text, location) {
//   let shapeArr = ["RECT", "ELLIPSE", "TRIANGLE", "X"];
//   let sizeArr = ["BIG", "SMALL"];
//   let strokeW = getRandomInt(0, 2);
//   let shape = shapeArr[getRandomInt(0, 4)];
//   let size = sizeArr[getRandomInt(0, 2)];
//   let set1 = [text, "COLOR", "WHITE", strokeW, shape, size];
//   let set2 = [text, "COLOR", "NONE", strokeW, shape, size];
//   let set3 = [text, "WHITE", "COLOR", strokeW, shape, size];
//   let set = [set1, set2, set3];

//   let graphic = new Shape(set[getRandomInt(0, 3)]);
//   let dcnv = createGraphics(graphic.s * 12, graphic.s * 8);
//   graphic.drawShape(dcnv);
//   // dcnv.position(location.x, location.y);
//   let dcnvCanvas = dcnv.elt;
//   dcnvCanvas.style.position = "absolute";
//   dcnvCanvas.style.left = location.x + "px";
//   dcnvCanvas.style.top = location.y + "px";
//   document.body.appendChild(dcnvCanvas);
//   // dcnv.parent(document.body);
// }
