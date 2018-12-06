import pieces, { types, Type } from './pieces';
import { Rotation, RotationValue } from './Rotation';
import Game from './Game';

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
    private type:Type = 'I',
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
    return this.config.split('\n').filter(Boolean)
      .map((line, yPos) => line.split('').map((char, xPos) => {
        return char !== ' ' && [this.x + xPos, this.y + yPos];
      }))
      .reduce((memo, c) => memo.concat(c.filter(Boolean)), []) as Coordinates[];
  }

  public land(game:Game) {
    this.currentConfig = this.config; // freeze rotation
    while (this.canMoveDown(game)) {
      this.moveDown(game);
    }
  }

  public canMoveDown(game:Game) {
    const a = game.arena.live(game.pieces);
    return (this.y < a.height - this.height) && this.coordinates.reduce((memo, [x,y]) => {
      const rowBelow = a.cells[y+1];
      return memo && !!rowBelow && !rowBelow[x].active;
    }, true);
  }

  public moveDown(game:Game) {
    const {arena} = game;
    if(this.canMoveDown(game)) {
      this.y = Math.min(arena.height - this.height, this.y + 1);
    }
  }

  public moveRight(game:Game) {
    const {arena} = game;
    this.x = Math.min(arena.width - this.width, this.x + 1);
  }

  public moveLeft(game?:Game) {
    this.x = Math.max(0, this.x - 1);
  }

  public rotateRight(game:Game) {
    this.rotate(Rotation.Right, game);
  }

  public rotateLeft(game:Game) {
    this.rotate(Rotation.Left, game);
  }

  protected rotate(deg:number, game:Game) {
    if (this.currentConfig) {
      throw new Error("Cannot rotate a frozen piece");
    }
    this.rotation = (this.rotation + deg) % Rotation.Full;

    const {arena} = game;
    if (this.x > arena.width-this.width) {
      this.moveLeft(game);
    }
    if (this.x < 0) {
      this.moveRight(game);
    }

  }
}
