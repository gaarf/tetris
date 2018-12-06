import { Rotation } from '../Rotation';

const Piece = {
  name: 'L',
  color: 'orange',

  [Rotation.None]: `
xxx
x
`,
  [Rotation.Right]: `
xx
 x
 x
`,
  [Rotation.Down]: `
  x
xxx
`,
  [Rotation.Left]: `
x
x
xx
`,
};

export default Piece;