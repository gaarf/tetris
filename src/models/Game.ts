import Arena from './Arena';
import Tetromino, { randomPiece } from './Tetromino';

const QUEUE_SIZE = 5;
const BASE_DELAY = 1000;

export default class Game {
  score = 0;
  level = 0;
  arena: Arena = new Arena();
  pieces: Tetromino[] = [];
  queue: Tetromino[] = [];

  private timeout:number;

  constructor(private render:Function) {
    this.topUpQueue();
    this.incrementLevel();
  }

  get dropDelay() {
    return BASE_DELAY;
  }
  
  get falling() {
    return this.queue[0];
  }

  get fullRows() {
    return this.arena
      .live(this.pieces)
      .cells
      .reduce((acc:number[], row, y) => {
        if (row.every(one => one.active)) {
          acc.push(y);
        }
        return acc;
      }, []);
  }

  get liveArena() {
    return this.arena.live(
      this.pieces.concat(this.falling)
    );
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

    const { falling } = this;
    if (falling.canMoveDown(this)) {
      falling.moveDown(this);
    }
    else {
      this.landPiece();
    }

    this.render(() => {
      this.timeout = window.setTimeout(this.gravity, this.dropDelay);
    })
  };

  handleKeydown(event:KeyboardEvent) {
    switch(event.code) {
      case 'ArrowLeft':
        return this.falling.moveLeft(this);
      case 'ArrowRight':
        return this.falling.moveRight(this);
      case 'KeyQ':
        return this.falling.rotateLeft(this);
      case 'KeyW':
      case 'ArrowUp':
        return this.falling.rotateRight(this);
      case 'ArrowDown':
        event.preventDefault();
        return this.falling.moveDown(this);
      case 'Space':
        return this.landPiece();
    }
  }

  landPiece() {
    if(this.falling) {
      const t = this.queue.shift() as Tetromino;
      t.land(this);
      this.pieces.push(t);

      const { fullRows } = this;
      if (fullRows.length) {
        this.removeRows(fullRows);
      }

      this.topUpQueue();
    }
  }

  removeRows(rows:number[]) {
    rows.forEach(ry => {
      this.pieces
        .filter(p => (ry >= p.y) && (ry <= p.y + p.height))
        .forEach(p => {
          p.removeRow(this, ry - p.y);
        });
    });

    this.render();
    this.stop();
  }

  incrementLevel() {
    this.level += 5;
    this.arena.init( this.level );
  }

  topUpQueue() {
    while(this.queue.length < QUEUE_SIZE) {
      const p = randomPiece();
      p.x = Math.ceil((this.arena.width / 2) - (p.width / 2));
      this.queue.push(p);
    }
  }
}