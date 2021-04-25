import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "refreshConfirm.dialog.html",
  styleUrls: ["refreshConfirm.dialog.scss"]
})
export class RefreshConfirmDialog {

  constructor(public dialogRef: MatDialogRef<RefreshConfirmDialog>) {}
}

