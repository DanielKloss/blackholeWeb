import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "../models/game";

@Component({
  selector: "app-dialog",
  templateUrl: "winner.dialog.html",
  styleUrls: ["winner.dialog.scss"]
})
export class WinnerDialog {
  game: Game;

  constructor(
    public dialogRef: MatDialogRef<WinnerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Game
  ) {
    this.game = data;
  }
}
