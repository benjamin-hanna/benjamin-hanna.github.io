// let elemLeft = canvas.offsetLeft + canvas.clientLeft,
//   elemTop = canvas.offsetTop + canvas.clientTop; //,

let repeater,
  count = 0;

function addCell(cell, array) {
  x = cell.getX;
  y = cell.getY;
  let arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
  let arrayY = new Array(-10, -10, -10, 0, 0, 10, 10, 10);

  if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length == 0) {
    for (let i = 0; i < 8; i++) {
      let neighborX = x + arrayX[i];
      let neighborY = y + arrayY[i];
      if (
        neighborX >= 0 &&
        neighborX <= 790 &&
        neighborY >= 0 &&
        neighborY <= 440
      ) {
        neighborCell = new Cell("DEAD", neighborX, neighborY, 0);
        array.push(neighborCell);
      }
    }
    array.push(cell);
  } else if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length > 0) {
    array.pushIfNotExist(cell, function (e) {
      return e.x === cell.x && e.y === cell.y;
    });
    for (let i = 0; i < 8; i++) {
      let neighborX = x + arrayX[i];
      let neighborY = y + arrayY[i];
      if (
        neighborX >= 0 &&
        neighborX <= 790 &&
        neighborY >= 0 &&
        neighborY <= 440
      ) {
        let neighbor = new Cell("DEAD", neighborX, neighborY, 0);
        array.pushIfNotExist(neighbor, function (e) {
          return e.x === neighbor.x && e.y === neighbor.y;
        });
      }
    }
    if (cell.getCellStatus == "ALIVE") {
      for (j in array) {
        if (array[j].getX == x && array[j].getY == y) {
          array[j].setCellStatus = "ALIVE";
        }
      }
    } else {
      for (k in array) {
        if (array[k].getX == x && array[k].getY == y) {
          array[k].setCellStatus = "DEAD";
        }
      }
    }
  }
}

function updateNeighborCount(array) {
  for (let i = 0; i < array.length; i++) {
    cell = array[i];
    let x = cell.getX;
    let y = cell.getY;
    let arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
    let arrayY = new Array(-10, -10, -10, 0, 0, 10, 10, 10);

    cell.setNeighbors = 0;

    for (let j = 0; j < 8; j++) {
      let neighborX = x + arrayX[j];
      let neighborY = y + arrayY[j];

      if (
        neighborX >= 0 &&
        neighborX <= 790 &&
        neighborY >= 0 &&
        neighborY <= 440
      ) {
        let alive = array.filter((cell) => cell.getCellStatus == "ALIVE");
        for (let k = 0; k < alive.length; k++) {
          if (neighborX == alive[k].getX && neighborY == alive[k].getY) {
            cell.setNeighbors = cell.getNeighbors + 1;
          }
        }
      }
    }
  }
}

function nextGeneration(array1, array2) {
  neighborArray = new Array();
  for (let i = 0; i < array1.length; i++) {
    let cell = array1[i];
    let neighborCount = cell.getNeighbors;

    if (cell.getCellStatus == "ALIVE") {
      if (neighborCount < 2) {
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--;
      }
      if (neighborCount == 2 || neighborCount == 3) {
        array1.splice(i, 1);
        array2.push(cell);
        i--;
      }
      if (neighborCount > 3) {
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--;
      }
    } else if (cell.getCellStatus == "DEAD") {
      if (neighborCount == 3) {
        array1.splice(i, 1);
        cell.setCellStatus = "ALIVE";
        array2.push(cell);
        i--;
        let x = cell.getX;
        let y = cell.getY;
        let arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
        let arrayY = new Array(-10, -10, -10, 0, 0, 10, 10, 10);

        for (let j = 0; j < 8; j++) {
          let neighborX = x + arrayX[j];
          let neighborY = y + arrayY[j];
          if (
            neighborX >= 0 &&
            neighborX <= 790 &&
            neighborY >= 0 &&
            neighborY <= 440
          ) {
            neighbor = new Cell("DEAD", neighborX, neighborY, 0);
            neighborArray.push(neighbor);
          }
        }
      } else {
        array1.splice(i, 1);
        array2.push(cell);
        i--;
      }
    }
  }
  for (let neighbors = 0; neighbors < neighborArray.length; neighbors++) {
    array2.pushIfNotExist(neighborArray[neighbors], function (e) {
      return (
        e.x === neighborArray[neighbors].x && e.y === neighborArray[neighbors].y
      );
    });
  }
}

Array.prototype.inArray = function (comparer) {
  for (let i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};

Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};

function blackAndWhite(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      if (array[i].getCellStatus == "ALIVE") {
        context.fillStyle = "black";
        context.fillRect(array[i].getX, array[i].getY, 10, 10);
      }
      if (array[i].getCellStatus == "DEAD") {
        context.clearRect(array[i].getX, array[i].getY, 10, 10);
      }
    }
  }
}

function addColor(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      if (array[i].getCellStatus == "ALIVE") {
        let style = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
        context.fillStyle = style;
        context.globalAlpha = 0.4;
        context.fillRect(array[i].getX, array[i].getY, 10, 10);
      }
      if (array[i].getCellStatus == "DEAD") {
        context.clearRect(array[i].getX, array[i].getY, 10, 10);
      }
    }
  }
}

arrayA = new Array();
arrayB = new Array();

function gosperGun() {
  if (arrayB.length > 0) {
    newGosperGun = new GosperGun(arrayB);
    arrayB = newGosperGun.makeGun();
    // blackAndWhite(arrayB);
    addColor(arrayB);
  } else {
    newGosperGun = new GosperGun(arrayA);
    arrayA = newGosperGun.makeGun();
    // blackAndWhite(arrayA);
    addColor(arrayA);
  }
}

function pulsar() {
  if (arrayA.length > 0) {
    newPulsar = new Pulsar(arrayA);
    arrayA = newPulsar.makePulsar();
    // blackAndWhite(arrayA);
    addColor(arrayA);
  } else {
    newPulsar = new Pulsar(arrayB);
    arrayB = newPulsar.makePulsar();
    // blackAndWhite(arrayB);
    addColor(arrayB);
  }
}

function rPentomino() {
  if (arrayA.length > 0) {
    newRPentominio = new RPentomino(arrayA);
    arrayA = newRPentominio.makeRPentomino();
    addColor(arrayA);
  } else {
    newRPentominio = new RPentomino(arrayB);
    arrayB = newRPentominio.makeRPentomino();
    addColor(arrayB);
  }
}

function flipFlop(array1, array2, i) {
  if (i % 2 == 0) {
    // blackAndWhite(array1);
    addColor(array1);
    updateNeighborCount(array1);
    nextGeneration(array1, array2);
  } else {
    // blackAndWhite(array2);
    addColor(array2);
    updateNeighborCount(array2);
    nextGeneration(array2, array1);
  }
}

function doWork() {
  repeater = setTimeout(doWork, 75);
  flipFlop(arrayA, arrayB, count);
  count++;
}

function stopWork() {
  clearTimeout(repeater);
}

function clearWork() {
  clearTimeout(repeater);
  arrayA.splice(0, arrayA.length);
  arrayB.splice(0, arrayB.length);
  context.clearRect(0, 0, canvas.width, canvas.height);
  count = 0;
}

function next() {
  repeater = setTimeout(doWork, 75);
  flipFlop(arrayA, arrayB, count);
  count++;
  clearTimeout(repeater);
}

// canvas.addEventListener(
//   "click",
//   function (event) {
//     let x = event.pageX - elemLeft,
//       y = event.pageY - elemTop;

//     x = Math.floor(x / 10) * 10;
//     y = Math.floor(y / 10) * 10;
//     cell = new Cell("ALIVE", x, y, 0);
//     if (arrayA.length > 0) {
//       addCell(cell, arrayA);
//       blackAndWhite(arrayA);
//     } else {
//       addCell(cell, arrayB);
//       blackAndWhite(arrayB);
//     }
//   },
//   false
// );
