import Cell from './Cell';

export default class Row {
  public cells: Cell[];
  public key: string;

  constructor(
    public width: number,
  ) {
    this.cells = Array(width)
      .fill(null)
      .map(() => new Cell());
  }

  public clone() {
    const out = new Row(this.width);
    this.cells.forEach((old, index) => {
      if (old.active) {
        out.cells[index].activate(old.color);
      }
    });
    return out;
  }

  public randomize() {
    this.cells.forEach((cell, i) => {
      if(i>0 && Math.random() > .5) {
        cell.activate();
      }
    });
  }
}