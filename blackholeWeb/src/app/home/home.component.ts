import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Game } from "../models/game";
import { Piece } from "../models/piece";
import { WinnerDialog } from "../dialogs/winner.dialog";
import { RefreshConfirmDialog } from "../dialogs/refreshConfirm.dialog";
import { HelpDialog } from "../dialogs/help.dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  moves: Array<[number, Piece]>;
  game: Game;
  canUndo: boolean;
  subscription: any;
  ai: boolean;
  isEnabled: boolean;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    this.moves = [];
    this.canUndo = false;
    this.ai = false;
    this.isEnabled = true;
  }

  ngOnInit(): void { }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async changeAi() {
    if (this.game.pieces.length == 20) {
      this.ai = !this.ai;
    } else {
      const dialogRef = this.dialog.open(RefreshConfirmDialog);
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.restart();
          this.ai = !this.ai;
        }
      });
    }
  }

  async addPiece(boardSpace: number) {
    if (
      this.game.board.spaces[boardSpace].containingPiece == null ||
      this.game.board.spaces[boardSpace].containingPiece == undefined
    ) {
      this.moves.push([boardSpace, this.game.pieces[0]]);
      this.canUndo = true;

      this.game.board.spaces[boardSpace].containingPiece = this.game.pieces[0];
      this.game.pieces.splice(0, 1);

      if (
        this.ai == true &&
        this.game.pieces.length > 0 &&
        this.game.pieces[0].player == 1
      ) {
        let aiSpace = this.chooseAiSpace();
        this.isEnabled = false;
        await this.delay(500);
        this.addPiece(aiSpace);
        this.isEnabled = true;
      }

      this.checkForEndGame();
    }
  }

  private chooseAiSpace() {
    let leastEmptySpaces = 100;
    let choosenSpace = [];
    let remainingSpaces = this.game.board.spaces.filter(s => s.containingPiece == null || s.containingPiece == undefined);
    
    remainingSpaces.forEach(remainingSpace => {
      let empty = 0;
      remainingSpace.surroundingSpaces.forEach(surroundingSpace => {
        if (this.game.board.spaces[surroundingSpace].containingPiece == null || this.game.board.spaces[surroundingSpace].containingPiece == undefined) {
          empty += 1;
        }
      });

      if (leastEmptySpaces > empty) {
        leastEmptySpaces = empty;
        choosenSpace = [];
        choosenSpace.push(remainingSpace.id);
      } else if (leastEmptySpaces == empty) {
        choosenSpace.push(remainingSpace.id);
      }
    });
    return choosenSpace[Math.floor(Math.random() * choosenSpace.length)];
  }

  async checkForEndGame() {
    if (this.game.pieces.length == 0) {
      this.game.board.getScoringPieces(this.game.board.getBlackHole());
      this.game.workOutWinner(this.game.board.scoringPieces);

      const dialogRef = this.dialog.open(WinnerDialog, {data: this.game});
      dialogRef.afterClosed().subscribe(() => {
        this.restart();
      });
    }
  }

  undo() {
    let numberOfUndos = 0;
    if (this.ai == false) {
      numberOfUndos = 1;
    } else {
      numberOfUndos = 2;
    }

    for (var i = 0; i < numberOfUndos; i++) {
      let move = this.moves.pop();
      this.game.board.spaces[move[0]].containingPiece = null;

      this.game.pieces.splice(0, 0, move[1]);

      if (this.moves.length == 0) {
        this.canUndo = false;
      }
    }
  }

  restart() {
    this.game = new Game();
    this.moves = [];
    this.canUndo = false;
  }

  help(){
    this.dialog.open(HelpDialog);
  }
}
