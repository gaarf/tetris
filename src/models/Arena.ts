import Cell from './Cell';
import Tetromino from './Tetromino';

export default class Arena {
  public cells: Cell[][];

  constructor(
    public height:number = 20,
    public width:number = 10,
  ){}

  public init(level:number = 1) {
    console.log('init', level, this);
    this.cells = Array(this.height).fill(this.mkRow());

    for (let i = 1; i < level; i++) {
      this.cells[this.height-i] = this.randomlyFilledRow();
    }
  }

  public live(pieces: Tetromino[]) {
    const live = new Arena(
      this.height,
      this.width,
    );
    live.cells = this.cells.map(
      row => row.map( cell => new Cell(cell.active) )
    );
    pieces.forEach(c => c.coordinates.forEach(([x, y]) => {
      live.cells[y][x].activate(c.color);
    }));
    return live;
  }

  public deactivateRow(y:number) {
    this.cells[y].forEach(cell => {
      cell.active = false;
    });
  }

  public shiftDown(y:number) {
    for (let i = y-1; i >= 0; i--) {
      this.cells[i].forEach((cell, x) => {
        this.cells[i+1][x].active = cell.active;
        cell.active = false;
      });
    }
  }

  private randomlyFilledRow() {
    return this.mkRow((_,i) => i>0 && Math.random() > .5);
  }

  private mkRow(map = (a:any, i:number) => !!a) {
    return Array(this.width)
      .fill(null)
      .map(map)
      .map(active => new Cell(active));
  }
}