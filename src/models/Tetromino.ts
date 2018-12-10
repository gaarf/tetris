import pieces, { types, Type } from './pieces';
import { Rotation, RotationValue } from './Rotation';
import Arena from './Arena';

export type Coordinates = [ number, number ];

const r = (f:number) => Math.floor(Math.random()*f);

export function randomPiece() {
  return new Tetromino(
    types[r(types.length)],
    90 * r(4),
  );
}

export default class Tetromino {
  public x:number = 0;
  public y:number = 0;

  constructor(
    public type:Type = 'I',
    public rotation:RotationValue = Rotation.None,
  ) {}

  private currentConfig:string;

  get config():string {
    return this.currentConfig || pieces[this.type][this.rotation];
  }

  get configRows():string[] {
    return this.config.split('\n').filter(Boolean);
  }

  get width():number {
    return this.configRows.reduce((m,v) => Math.max(m, v.length), 0);
  }

  get height():number {
    return this.configRows.length;
  }

  get color():string {
    return pieces[this.type].color;
  }

  get rotationName():string {
    return Rotation[this.rotation];
  }

  get coordinates():Coordinates[] {
    return this.configRows
      .map((line, yPos) => line.split('').map((char, xPos) => {
        return char !== ' ' && [this.x + xPos, this.y + yPos];
      }))
      .reduce((memo, c) => memo.concat(c.filter(Boolean)), []) as Coordinates[];
  }

  public land(arena:Arena) {
    console.log('landing', this);
    this.currentConfig = this.config; // freeze rotation
    while (this.canMoveDown(arena)) {
      this.moveDown(arena);
    }
  }

  public removeRow(arena:Arena, row:number) {
    this.currentConfig = this.configRows
      .map((line, i) => i === row ? line.replace(/./g, ' ') : line)
      .join('\n');
  }

  public canMoveDown(arena:Arena) {
    return (this.y < arena.height - this.height) && this.coordinates.every(([x,y]) => {
      const rowBelow = arena.rows[y+1];
      return !!rowBelow && !rowBelow.cells[x].active;
    });
  }

  public moveDown(arena:Arena) {
    if (this.canMoveDown(arena)) {
      this.y = Math.min(arena.height - this.height, this.y + 1);
    }
  }


  public canMoveRight(arena:Arena) {
    return (this.x < arena.width - this.width) && this.coordinates.every(([x,y]) => {
      return !arena.rows[y].cells[x+1].active;
    });
  }

  public moveRight(arena:Arena) {
    if (this.canMoveRight(arena)) {
      this.x = Math.min(arena.width - this.width, this.x + 1);
    }
  }

  public canMoveLeft(arena:Arena) {
    return (this.x > 0) && this.coordinates.every(([x,y]) => {
      return !arena.rows[y].cells[x-1].active;
    });
  }

  public moveLeft(arena:Arena) {
    if (this.canMoveLeft(arena)) {
      this.x = Math.max(0, this.x - 1);
    }
  }

  public rotateRight(arena:Arena) {
    this.rotate(Rotation.Right, arena);
  }

  public rotateLeft(arena:Arena) {
    this.rotate(Rotation.Left, arena);
  }

  protected rotate(deg:number, arena:Arena) {
    if (this.currentConfig) {
      throw new Error("Cannot rotate a frozen piece");
    }
    this.rotation = (this.rotation + deg) % Rotation.Full;

    if (this.x > arena.width-this.width) {
      this.moveLeft(arena);
    }
    if (this.x < 0) {
      this.moveRight(arena);
    }

  }
}
