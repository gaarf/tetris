import * as React from 'react';
import Tetromino from '../models/Tetromino';

export type Props = {
  item: Tetromino;
};

export default function TetrominoComponent (props: Props) {
  const { item } = props;

  return (
    <div>
      Tetromino:
      <pre>
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  );
}
