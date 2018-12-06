import { Rotation } from '../Rotation';

const block = `
xx
xx
`;


const Piece = {
  name: 'O',
  color: 'yellow',

  [Rotation.None]: block,
  [Rotation.Right]: block,
  [Rotation.Down]: block,
  [Rotation.Left]: block,
};

export default Piece;