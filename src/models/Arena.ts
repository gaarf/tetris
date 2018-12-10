import Row from './Row';
import Tetromino from './Tetromino';

export default class Arena {
  public rows: Row[];

  constructor(
    public height:number = 20,
    public width:number = 10,
  ){}

  public init(level:number = 1) {
    console.log('init', level, this);
    const { width, height } = this;
    this.rows = Array(height)
      .fill(null)
      .map(() => new Row(width));

    const r = Math.min(this.height/2, level);
    for (let i = 1; i < r; i++) {
      this.rows[this.height-i].randomize();
    }
  }

  public add(piece: Tetromino) {
    piece.land(this);
    piece.coordinates.forEach(([x, y]) => {
      this.rows[y].cells[x].activate(piece.color);
    });
  }

  public live(piece: Tetromino) {
    const live = new Arena(this.height, this.width);
    live.rows = this.rows.map(row => row.clone());
    piece.coordinates.forEach(([x, y]) => {
      live.rows[y].cells[x].activate(piece.color);
    });
    return live;
  }

  public deactivateRow(y:number) {
    this.rows[y].cells.forEach(cell => {
      cell.active = false;
    });
  }

  public shiftDown(y:number):Boolean {
    for (let i = y-1; i >= 0; i--) {
      this.rows[i].cells.forEach((cell, x) => {
        const below = this.rows[i+1].cells[x];
        if(cell.active && !below.active) {
          below.activate(cell.color);
          cell.active = false;
        }
      });
    }

    return !this.rows
      .slice(0, y)
      .every(({cells}, j) => cells.every(
        (cell, x) => !cell.active || this.rows[j+1].cells[x].active
      ));
  }
}