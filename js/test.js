var elem = document.getElementById("canvas"),
  elemLeft = elem.offsetLeft + elem.clientLeft,
  elemTop = elem.offsetTop + elem.clientTop,
  context = canvas.getContext("2d"),
  elements = [];

// Add event listener for `click` events.
elem.addEventListener(
  "click",
  function (event) {
    var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;

    // Collision detection between clicked offset and element.
    elements.forEach(function (element) {
      if (
        y > element.top &&
        y < element.top + element.height &&
        x > element.left &&
        x < element.left + element.width
      ) {
        x = Math.floor(x / 10) * 10;
        y = Math.floor(y / 10) * 10;
        context.fillStyle = "black";
        context.fillRect(x, y, 10, 10);
      }
    });
  },
  false
);

// Add element.
elements.push({
  colour: "#05EFFF",
  width: 800,
  height: 450,
  top: 0,
  left: 0,
});

// Render elements.
elements.forEach(function (element) {
  context.fillStyle = element.colour;
  context.fillRect(element.left, element.top, element.width, element.height);
});
