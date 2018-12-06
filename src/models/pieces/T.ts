import { Rotation } from '../Rotation';

const Piece = {
  name: 'T',
  color: 'purple',

  [Rotation.None]: `
xxx
 x
`,
  [Rotation.Right]: `
 x
xx
 x
`,
  [Rotation.Down]: `
 x
xxx
`,
  [Rotation.Left]: `
x
xx
x
`,
};

export default Piece;