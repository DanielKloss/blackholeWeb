import { Piece } from "./piece";

export class Space {
  id: number;
  row: number;
  surroundingSpaces: Array<number>;
  containingPiece: Piece;
  isBlackHole: boolean;
  isSurrounding: boolean;

  constructor(_id: number, _surroundingSpaces: Array<number>) {
    this.id = _id;
    this.surroundingSpaces = _surroundingSpaces;
    this.isBlackHole = false;
    this.isSurrounding = false;
  }
}
