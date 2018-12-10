import * as React from 'react';
import Tetromino from '../models/Tetromino';

export type Props = {
  pieces: Tetromino[];
};

export default function Queue (props: Props) {
  const { pieces: [falling, ...queue] } = props;

  return (
    <p>
      <mark>{falling.type}</mark>,&nbsp;
      {queue.map((piece) => piece.type).join(', ')}
    </p>
  );
}
