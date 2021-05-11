import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'sw-contest-apply',
  templateUrl: './contest-apply.component.html',
  styleUrls: ['./contest-apply.component.scss']
})
export class ContestApplyComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'contest-apply-dialog.component.html',
})
export class DialogContentExampleDialog {}
