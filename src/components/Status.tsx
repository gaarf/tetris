import * as React from 'react';
import Game from '../models/Game';

export type Props = {
  game: Game;
  tick: number;
};

export default function Status (props: Props) {
  const { game, tick } = props;

  return (
    <div>
      <p>
        Level: <mark>{game.level}</mark>
      </p>
      <p>
        Score: <mark>{game.score}</mark>
      </p>
      <samp>{tick}</samp>
    </div>
);
}
