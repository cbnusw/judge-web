import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormControlDirective} from '@angular/forms';


@Component({
  selector: 'sw-contest-post',
  templateUrl: './contest-post.component.html',
  styleUrls: ['./contest-post.component.scss']
})
export class ContestPostComponent implements OnInit {

  constructor() { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  ngOnInit(): void {
  }


}
