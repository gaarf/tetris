import { Rotation } from '../Rotation';

const horizontal = `
xxxx
`;

const vertical = `
x
x
x
x
`;

const Piece = {
  name: 'I',
  color: 'cyan',

  [Rotation.None]: horizontal,
  [Rotation.Right]: vertical,
  [Rotation.Down]: horizontal,
  [Rotation.Left]: vertical,
};

export default Piece;