import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
interface FormObject {
  id: string,
  name: string,
  password: string,
  confirmPassword: string,
  gradeNum: string,
  email: string,
  affiliation: string
}

interface FormClass{
  class: string,
  korean: string,
  note?: string
}
@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})

export class JoinPageComponent implements OnInit {
  joinForm;
  formSelected = new EventEmitter();
  formClass:Array<FormClass> = [
    {class : 'id', korean:'아이디', note:'4~12글자'},
    {class : 'password', korean:'비밀번호', note:'8글자 이상, 영문과 숫자 조합'},
    {class : 'password', korean:'비밀번호 확인',},
    {class : 'name', korean:'이름'},
    {class : 'gradeNum', korean:'학번'},
    {class : 'affiliation', korean:'소속'},
    {class : 'email', korean:'E-mail'}
  ];
  constructor(
    private formBuilder: FormBuilder,
    ){
      this.joinForm = this.formBuilder.group({
        id: '',
        name: '',
        password: '',
        gradeNum: '',
        email: '',
        affiliation: ''
      })
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');


  }
  onSubmit(value: FormObject ){

  }
}
