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

  topUpQueue() {
    while(this.queue.length < QUEUE_SIZE) {
      const p = randomPiece();
      p.x = Math.ceil((this.arena.width / 2) - (p.width / 2));
      this.queue.push(p);
    }
  }
  
  get falling() {
    return this.queue[0];
  }

  get liveArena() {
    return this.arena.live(
      this.pieces.concat(this.falling)
    );
  }

  handleKeydown(event:KeyboardEvent) {
    switch(event.code) {
      case 'ArrowLeft':
        return this.falling.moveLeft(this);
      case 'ArrowRight':
        return this.falling.moveRight(this);
      case 'KeyQ':
        return this.falling.rotateLeft(this);
      case 'KeyW':
        return this.falling.rotateRight(this);
      case 'ArrowDown':
        return this.falling.moveDown(this);
      case 'ArrowUp':
        return this.landPiece();
    }
  }

  landPiece() {
    if(this.falling) {
      const t = this.queue.shift() as Tetromino;
      t.land(this);
      this.pieces.push(t);
      this.topUpQueue();
    }
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

  incrementLevel() {
    this.level += 5;
    this.arena.init( this.level );
  }
}