import { Injectable } from '@angular/core';


export interface Post{
  _id:any,
  title: string,
  
}

@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {

  constructor() { }
}
