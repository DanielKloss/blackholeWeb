import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { WinnerDialog } from "./dialogs/winner.dialog";
import { RefreshConfirmDialog } from "./dialogs/refreshConfirm.dialog";
import { HelpDialog } from "./dialogs/help.dialog";

import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [AppComponent, HomeComponent, WinnerDialog, RefreshConfirmDialog, HelpDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}