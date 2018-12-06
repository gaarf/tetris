import I from './I';
import J from './J';
import L from './L';
import O from './O';
import S from './S';
import T from './T';
import Z from './Z';

const pieces = { I, J, L, O, S, T, Z };

export type Type = 'I'|'J'|'L'|'O'|'S'|'T'|'Z';

export const types = Object.keys(pieces) as Type[];

export default pieces;