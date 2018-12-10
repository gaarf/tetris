import * as React from 'react';
import Game from '../models/Game';

import Arena from './Arena';
import Status from './Status';
import Queue from './Queue';

export type Props = {
  game: Game;
  tick: number;
};

export default function GameComponent (props: Props) {
  const { game, tick } = props;

  return (
    <div>
      <Arena arena={game.liveArena} />
      <Status game={game} tick={tick} />
      <Queue pieces={game.queue} />
    </div>
  );
}
