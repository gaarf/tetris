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

  private randomlyFilledRow() {
    return this.mkRow(() => Math.random() > .5);
  }

  private mkRow(map = (a:any) => !!a) {
    return Array(this.width)
      .fill(null)
      .map(map)
      .map(active => new Cell(active));
  }
}