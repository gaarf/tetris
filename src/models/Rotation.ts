export enum Rotation {
  None = 0,
  Right = 90,
  Down = 180,
  Left = 270,
  Full = 360,
}

export type RotationValue = Rotation.None | Rotation.Right | Rotation.Down | Rotation.Left;
