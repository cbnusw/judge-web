import { Injectable } from '@angular/core';


export interface Post {
  _id: any;
  title: string;
  pdf: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {

  examples: Array<Post>;

  constructor() {
    this.examples = [
      {
        _id: 0,
        title: '예시',
        pdf: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
      }
    ];
  }
  getContest(id: number): Post {
    return this.examples[id];
  }
}
