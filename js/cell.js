class Cell {
  constructor(cellStatus, x, y, neighbors) {
    this.status = cellStatus;
    this.x = x;
    this.y = y;
    this.neighbors = neighbors;
  }
  get getCellStatus() {
    return this.status;
  }
  set setCellStatus(newStatus) {
    this.status = newStatus;
  }
  set setX(newX) {
    this.x = newX;
  }
  get getX() {
    return this.x;
  }
  set setY(newY) {
    this.y = newY;
  }
  get getY() {
    return this.y;
  }
  set setNeighbors(newNeighbors) {
    this.neighbors = newNeighbors;
  }
  get getNeighbors() {
    return this.neighbors;
  }
}
