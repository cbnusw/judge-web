import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'sw-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {
  id: string
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=> {
      this.id = params.get('id');
    })
  }

}
