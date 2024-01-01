class RPentomino {
  constructor(array) {
    this.array = array;
  }
  makeRPentomino() {
    let rPentoArrayX = new Array(370, 380, 380, 380, 390);
    let rPentoArrayY = new Array(190, 200, 190, 180, 180);

    for (let i = 0; i < rPentoArrayX.length; i++) {
      let x = rPentoArrayX[i];
      let y = rPentoArrayY[i];
      let cell = new Cell("ALIVE", x, y, 0);
      addCell(cell, this.array);
    }
    return this.array;
  }
}
