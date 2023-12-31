var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
elemLeft = canvas.offsetLeft + canvas.clientLeft,
elemTop = canvas.offsetTop + canvas.clientTop,
repeater,
count = 0;

function addCell(cell, array){
  x = cell.getX;
  y = cell.getY;
  var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0,  10);
  var arrayY = new Array(-10,-10,-10, 0,   0,  10, 10, 10);

  if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length == 0) { 
    for(var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) { 
        neighborCell = new Cell("DEAD", neighborX, neighborY, 0); 
        array.push(neighborCell);    
      };
    };
      array.push(cell); 
  }  
  else if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length > 0) { 
    array.pushIfNotExist(cell, function(e) { 
      return e.x === cell.x && e.y === cell.y; 
    });
    for (var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {
        var neighbor = new Cell("DEAD", neighborX, neighborY, 0); 
        array.pushIfNotExist(neighbor , function(e) { 
          return e.x === neighbor.x && e.y === neighbor.y; 
        });
      };
    };
    if(cell.getCellStatus == "ALIVE"){
      for(j in array) {
        if(array[j].getX == x && array[j].getY == y){
          array[j].setCellStatus = "ALIVE";
        };
      };
    }
    else {
      for(k in array) {
        if(array[k].getX == x && array[k].getY == y){
          array[k].setCellStatus = "DEAD";
        };
      };
    };
  };
};

function updateNeighborCount(array) {
  for(var i = 0; i < array.length; i++) { 
    cell = array[i];
    var x = cell.getX;
    var y = cell.getY;
    var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
    var arrayY = new Array(-10, -10, -10, 0, 0,  10, 10, 10);
    
    cell.setNeighbors = 0;

    for(var j = 0; j < 8; j++) { 
      var neighborX = x + arrayX[j];
      var neighborY = y + arrayY[j];

      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440 ) {
        let alive = array.filter(cell => cell.getCellStatus == "ALIVE"); 
        for(var k = 0; k < alive.length; k++) { 
          if(neighborX == alive[k].getX && neighborY == alive[k].getY) {
            cell.setNeighbors = cell.getNeighbors + 1;
          };
        };
      };
    };
  };
};

function nextGeneration(array1, array2) {
  neighborArray = new Array();
  for(var i = 0; i < array1.length; i++) { 
    var cell = array1[i];
    var neighborCount = cell.getNeighbors;

    if (cell.getCellStatus == "ALIVE") {
      if (neighborCount < 2) {
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
      if(neighborCount == 2 || neighborCount == 3) {
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };   
      if (neighborCount > 3) { 
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    }
    else if (cell.getCellStatus == "DEAD") {
      if(neighborCount == 3) {
        array1.splice(i, 1);
        cell.setCellStatus = "ALIVE";
        array2.push(cell);
        i--;
        var x = cell.getX;
        var y = cell.getY;
        var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
        var arrayY = new Array(-10, -10, -10, 0, 0,  10, 10, 10);
    
        for(var j = 0; j < 8; j++) { 
          var neighborX = x + arrayX[j];
          var neighborY = y + arrayY[j];
          if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {
            neighbor = new Cell("DEAD", neighborX, neighborY, 0);
            neighborArray.push(neighbor);
          };
        };
      }
      else {
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    };
  };
  for(var neighbors = 0; neighbors < neighborArray.length; neighbors++) {
    array2.pushIfNotExist(neighborArray[neighbors] , function(e) { 
      return e.x === neighborArray[neighbors].x && e.y === neighborArray[neighbors].y; 
    });
  };
};

Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  };
  return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
  if(!this.inArray(comparer)) {
      this.push(element);
  };
};

function blackAndWhite(array) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] !== undefined) {   
      if(array[i].getCellStatus == "ALIVE") {
        context.fillStyle = "black";
        context.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
      if(array[i].getCellStatus == "DEAD") {
        context.clearRect(array[i].getX, array[i].getY, 10, 10);
      };
    };
  };
};

arrayA = new Array();
arrayB = new Array();

function gosperGun(){

  if(arrayB.length > 0){
    newGosperGun = new GosperGun(arrayB);
    arrayB = newGosperGun.makeGun();
    blackAndWhite(arrayB);
  }
  else {
    newGosperGun = new GosperGun(arrayA);
    arrayA = newGosperGun.makeGun();
    blackAndWhite(arrayA);
  };
};

function pulsar(){
  if(arrayA.length > 0){
    newPulsar = new Pulsar(arrayA);
    arrayA = newPulsar.makePulsar();
    blackAndWhite(arrayA);
  }
  else {
    newPulsar = new Pulsar(arrayB);
    arrayB = newPulsar.makePulsar();
    blackAndWhite(arrayB);
  };
};

function flipFlop(array1, array2, i) {
  if(i % 2 == 0) {
    blackAndWhite(array1);
    updateNeighborCount(array1);
    nextGeneration(array1, array2);
  }
  else{
    blackAndWhite(array2);
    updateNeighborCount(array2);
    nextGeneration(array2, array1);
  };
};

function doWork() {
  repeater = setTimeout(doWork, 75);
  flipFlop(arrayA, arrayB, count);
  count++;
};

function stopWork(){
  clearTimeout(repeater);
};

function clearWork(){
  clearTimeout(repeater);  
  arrayA.splice(0, arrayA.length);
  arrayB.splice(0, arrayB.length);
  context.clearRect(0, 0, canvas.width, canvas.height);
  count = 0;
};

function next(){
  repeater = setTimeout(doWork, 75);
  flipFlop(arrayA, arrayB, count);
  count++;
  clearTimeout(repeater);
};

canvas.addEventListener('click', function(event) {
  var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;

  x = Math.floor((x / 10)) * 10;
  y = Math.floor((y / 10)) * 10;
  cell = new Cell("ALIVE", x, y, 0);
  if(arrayA.length > 0) {
    addCell(cell, arrayA);
    blackAndWhite(arrayA);
  }
  else{
    addCell(cell, arrayB);
    blackAndWhite(arrayB);
  };
}, false);
