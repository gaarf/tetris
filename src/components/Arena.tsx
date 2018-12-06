import * as React from 'react';
import Arena from '../models/Arena';
import './arena.css';

export type Props = {
  arena: Arena;
};

export default function ArenaComponent (props: Props) {
  const { arena: { cells } } = props;

  return (
    <ol className="arena">
      {cells.map((row, y) => (
        <li key={`row-${y}`}>
          <ol>
            {row.map((cell, x) => (
              <li
                key={`cell-${y}-${x}`}
                className={cell.className}
                style={{backgroundColor: cell.color}}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
