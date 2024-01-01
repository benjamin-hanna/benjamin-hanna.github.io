class GosperGun {
  constructor(array) {
    this.array = array;
  }
  makeGun() {
    let gosperArrayX = new Array(
      20,
      30,
      20,
      30,
      360,
      370,
      360,
      370,
      260,
      260,
      240,
      230,
      220,
      230,
      220,
      230,
      220,
      240,
      260,
      260,
      150,
      140,
      130,
      120,
      120,
      120,
      130,
      140,
      150,
      170,
      180,
      180,
      190,
      160,
      180,
      170
    );
    let gosperArrayY = new Array(
      40,
      40,
      50,
      50,
      20,
      20,
      30,
      30,
      0,
      10,
      10,
      20,
      20,
      30,
      30,
      40,
      40,
      50,
      50,
      60,
      20,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      80,
      70,
      60,
      50,
      50,
      50,
      40,
      30
    );

    for (let i = 0; i < gosperArrayX.length; i++) {
      let x = gosperArrayX[i];
      let y = gosperArrayY[i];
      let cell = new Cell("ALIVE", x, y, 0);
      addCell(cell, this.array);
    }
    return this.array;
  }
}
