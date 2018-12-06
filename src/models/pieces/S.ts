import { Rotation } from '../Rotation';

const horizontal = `
 xx
xx
`;

const vertical = `
x
xx
 x
`;

const Piece = {
  name: 'S',
  color: 'green',

  [Rotation.None]: horizontal,
  [Rotation.Right]: vertical,
  [Rotation.Down]: horizontal,
  [Rotation.Left]: vertical,
};

export default Piece;