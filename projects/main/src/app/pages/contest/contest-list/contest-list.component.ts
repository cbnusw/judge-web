import { Component, OnInit } from '@angular/core';
import { ContestDetailService, Post } from '../contest-detail.service'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService } from '../../../services/storage.service';
@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  contests: Array<Post>
  constructor(detail: ContestDetailService) {
    this.contests = detail.getContests();
  }

  //enrolling User
  protected enrollUser = function (_id: any) {

    //testing code
    const storageService = new StorageService;
    const refreshToken: string = storageService.get(REFRESH_TOKEN_KEY);
    const accessToken: string = storageService.get(ACCESS_TOKEN_KEY);
    console.log(` id :  ${_id}  token : ${refreshToken} ${accessToken}`);

    //real code
    const enrollInfo: EnrollInfo = {
      _id: `${_id}`,
      accessToken: `${accessToken}`,
      refreshToken: `${refreshToken},`
    };
  }



  ngOnInit(): void {
  }

}

export interface EnrollInfo {
  _id: any;
  accessToken: string;
  refreshToken: string;
}