let nameTags;

function initMove() {
  nameTags = $(".name-tag");
  nameTags.each(function () {
    // Calculate a random left position
    let randomLeft = Math.floor(Math.random() * $(window).width());

    // Set the left property for the current element
    $(this).css("left", randomLeft + "px");
  });
}

function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() + 100;
  var w = $(window).width() + 100;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function animateDiv(element) {
  // Get a new position
  var newq = makeNewPosition();

  // Animate the element to the new position with a slower duration
  element.animate(
    { top: newq[0], left: newq[1] },
    {
      duration: 12000,
      easing: "linear",
      complete: function () {
        // Call the animateDiv function recursively for continuous movement
        animateDiv(element);
      },
    }
  );
}

function moveNameTags(moving) {
  if (moving) {
    nameTags.each(function () {
      animateDiv($(this));
    });
  } else {
    // Stop the animation
    nameTags.stop();
  }
}
