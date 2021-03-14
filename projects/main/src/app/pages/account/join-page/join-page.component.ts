import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder} from '@angular/forms';
interface formObjects {
  id: string,
  name: string,
  password: string,
  confirmPassword: string,
  gradeNum: string,
  email: string,
  affiliation: string
}

interface formClasses{
  class: string,
  korean: string
}
@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {
  joinForm;
  formSelected = new EventEmitter();
  formClass:Array<formClasses> = [
    {class : 'id', korean:'아이디'},
    {class : 'password', korean:'비밀번호'},
    {class : 'password', korean:'비밀번호 확인'},
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
  onSubmit(value:string ){

  }
}
