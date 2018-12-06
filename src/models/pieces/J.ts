import { Rotation } from '../Rotation';

const Piece = {
  name: 'J',
  color: 'blue',

  [Rotation.None]: `
xxx
  x
`,
  [Rotation.Right]: `
 x
 x
xx
`,
  [Rotation.Down]: `
x
xxx
`,
  [Rotation.Left]: `
xx
x
x
`,
};

export default Piece;