import * as React from 'react';
import Arena from '../models/Arena';
import './arena.css';

export type Props = {
  arena: Arena;
};

export default function ArenaComponent (props: Props) {
  const { arena: { rows } } = props;

  return (
    <ol className="arena">
      {rows.map((row, y) => (
        <li key={y}>
          <ol>
            {row.cells.map((cell, x) => (
              <li
                key={x}
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
