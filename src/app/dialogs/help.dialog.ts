import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "help.dialog.html",
  styleUrls: ["help.dialog.scss"]
})
export class HelpDialog {

  constructor(public dialogRef: MatDialogRef<HelpDialog>) {}
}

