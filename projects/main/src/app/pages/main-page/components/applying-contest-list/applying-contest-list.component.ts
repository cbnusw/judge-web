import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractSearchDirective } from '../../../../classes/abstract-search.directive';
import { IContest } from '../../../../models/contest';
import { IParams } from '../../../../models/params';
import { IListResponse } from '../../../../models/response';
import { ContestService } from '../../../../services/apis/contest.service';

@Component({
  selector: 'sw-applying-contest-list',
  templateUrl: './applying-contest-list.component.html',
  styleUrls: ['./applying-contest-list.component.scss'],
  providers: [DatePipe]
})
export class ApplyingContestListComponent extends AbstractSearchDirective<IContest> {

  constructor(private contestService: ContestService) {
    super({});
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IContest>> {
    return this.contestService.getApplyingContests();
  }
}
