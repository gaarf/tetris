import Arena from './Arena';
import Tetromino, { randomPiece } from './Tetromino';

const QUEUE_SIZE = 5;
const BASE_DELAY = 1000;
const POINTS = [100,200,300,800];
const DROPS_PER_LEVEL = 10;

export default class Game {
  public score = 0;
  public level = 1;
  public arena: Arena = new Arena();
  public queue: Tetromino[] = [];

  private drops:number = 0;
  private timeout:number;

  constructor(private render:Function) {
    this.topUpQueue();
    this.arena.init( this.level );
  }

  get dropDelay() {
    return BASE_DELAY / Math.log1p(this.level);
  }
  
  get falling() {
    return this.queue[0];
  }

  get fullRows() {
    return this.arena
      .rows
      .reduce((acc:number[], row, y) => {
        if (row.cells.every(one => one.active)) {
          acc.push(y);
        }
        return acc;
      }, []);
  }

  get liveArena() {
    return this.arena.live(this.falling);
  }

  start() {
    if(!this.timeout) {
      this.gravity();
    }
  }

  stop() {
    window.clearTimeout(this.timeout);
    delete this.timeout;
  }

  gravity = () => {
    window.clearTimeout(this.timeout);

    const { falling, arena } = this;
    if (falling.canMoveDown(arena)) {
      falling.moveDown(arena);
    }
    else {
      this.addPiece();
    }

    this.render(() => {
      this.timeout = window.setTimeout(this.gravity, this.dropDelay);
    })
  };

  handleKeydown(event:KeyboardEvent) {
    const { arena } = this;
    switch(event.code) {
      case 'ArrowLeft':
        return this.falling.moveLeft(arena);
      case 'ArrowRight':
        return this.falling.moveRight(arena);
      case 'KeyQ':
        return this.falling.rotateLeft(arena);
      case 'KeyW':
      case 'ArrowUp':
        return this.falling.rotateRight(arena);
      case 'ArrowDown':
        return this.falling.moveDown(arena);
      case 'Space':
        return this.addPiece();
    }
  }

  addPiece() {
    this.arena.add(
      this.queue.shift() as Tetromino
    );
    this.drops++;
    this.topUpQueue();

    const { fullRows } = this;
    if (fullRows.length) {
      this.removeRows(fullRows);
      this.score += POINTS[fullRows.length - 1];


      if(this.drops >= DROPS_PER_LEVEL) {
        this.incrementLevel();
      }
    }
  }

  removeRows(ys:number[]) {
    ys.forEach(y => {
      this.arena.deactivateRow(y);
    });
    this.render();

    const y = Math.max(...ys);
    const d = this.dropDelay / ys.length + 2;
    const f = () => {
      if(this.arena.shiftDown(y)) {
        console.log('can shiftDown more...');
        setTimeout(f, d);
      }
      this.render();
    };
    setTimeout(f, d);
  }

  incrementLevel() {
    this.level += 1;
    this.drops = 0;
  }

  topUpQueue() {
    while(this.queue.length < QUEUE_SIZE) {
      const p = randomPiece();
      p.x = Math.ceil((this.arena.width / 2) - (p.width / 2));
      this.queue.push(p);
    }
  }
}