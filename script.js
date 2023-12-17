import jsonData from "./data/nameratio.json" assert { type: "json" };

let moving = true;
let firstArr = [];
let lastArr = [];
let focusedElement = null;

for (let i = 0; i < 100; i++) {
  firstArr.push([jsonData[i].firstname, jsonData[i].firstweight]);
  if (jsonData[i].lastname !== undefined) {
    lastArr.push([jsonData[i].lastname, jsonData[i].lastweight]);
  }
}

for (let i = 0; i < 100; i++) {
  const nameTagInstance = new NameTag(firstArr, lastArr);

  const body = document.getElementById("body");
  nameTagInstance.createName();
  nameTagInstance.createSex();
  nameTagInstance.createPhone();
  nameTagInstance.drawGraphic();
  body.appendChild(nameTagInstance.createDOMElement());
}

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
      moving = !moving;
      moveNameTags(moving);

      // Check if there is at least one element with the "focused" class
      const hasFocusedElement = nameTags.hasClass("focused");

      // Execute moveNameTags(false) if there is at least one focused element
      if (hasFocusedElement) {
        moving = !moving;
        moveNameTags(false);
      }
    }
  });

  // Handle click events on elements with the "name-tag" class
  nameTags.on("click", function (e) {
    // Add the "focused" class to the clicked element
    nameTags.removeClass("focused");
    $(this).addClass("focused");
    if (moving) {
      moving = !moving;
      moveNameTags(moving);
      const clickedName = e.target.textContent;
      console.log(JamoUtil.split(clickedName));
    }
  });
});
