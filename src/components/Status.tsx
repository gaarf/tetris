import * as React from 'react';
import Game from '../models/Game';

export type Props = {
  game: Game;
  tick: number;
};

export default function Status (props: Props) {
  const { game: { level, score } } = props;

  return (
    <div>
      <p>
        Level: <mark>{level}</mark>
      </p>
      <p>
        Score: <mark>{score}</mark>
      </p>
    </div>
);
}
