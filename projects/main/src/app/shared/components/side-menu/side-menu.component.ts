import { Component, OnInit } from '@angular/core';

interface MenuList{
  name:string,
  link:string
}


@Component({
  selector: 'sw-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent implements OnInit {
  constructor() {}
  lists: MenuList[];
  
  logOut:MenuList[]=[
    {name:'noneLogin1',link:"#"}, 
    {name:'로그인페이지',link:"/account/login"},
    {name:'회원가입페이지',link:"/account/join"}];
  
  logIn:MenuList[]=[
    {name:'Login1',link:"#"},
    {name:'Login2',link:"#"},
    {name:'Login3',link:"#"}]
  
  loginStatus:Boolean=false;


  setLogin(status:Boolean){
    this.loginStatus=status;
    if(status==true) this.lists=this.logIn;
    else this.lists=this.logOut;
  }

  ngOnInit(): void {
    this.lists=this.logOut;
  }
}
