import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

interface FormClasses{
  class: string,
  korean: string
}
@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {
  form;
  formClass:Array<FormClasses> = [
    {class : 'id', korean:'아이디'},
    {class : 'password', korean:'비밀번호'},
    {class : 'passwordConfirmation', korean:'비밀번호 확인'},
    {class : 'name', korean:'이름'},
    {class : 'gradeNum', korean:'학번'},
    {class : 'affiliation', korean:'소속'},
    {class : 'email', korean:'E-mail'}
  ];

  formErrorMessages = {
    'id': {
      'required': '아이디는 필수항목입니다.',
      'pattern': '4~12글자 입력해주세요.',
    },
    'name': {
      'required': '이름은 필수항목입니다.',
      'pattern': '2글자 이상 입력해주세요.',
      'duplication' : '이미 가입된 아이디 입니다.',
      'duplicationCheck' : '중복검사를 해주세요.'
    },
    'email': {
      'required': '이메일은 필수항목입니다.',
      'pattern': '올바른 이메일 형식이 아닙니다.',
      'duplication' : '이미 가입된 이메일입니다.',
    },
    'password': {
      'required': '비밀번호는 필수항목입니다.',
      'pattern': '최소 8자이상 숫자와 문자를 포함해주세요.',
    },
    'passwordConfirmation': {
      'required': '비밀번호 확인은 필수항목입니다.',
      'match': '비밀번호와 동일하게 입력해주세요.', //4
    },
  };

  formErrors = {
    'id':'',
    'name':'',
    'email':'',
    'password':'',
    'passwordConfirmation':'',
    'affiliation':''
  };

  constructor(
    private formBuilder: FormBuilder,
    ){
      this.buildForm();
    }

    
  buildForm(): void { //1
    this.form = this.formBuilder.group({
      id:["", [Validators.required, Validators.pattern(/^.{4,12}$/)]],
      name:["", [Validators.required, Validators.pattern(/^.{4,12}$/)]],
      email:["", [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)]],
      passwordConfirmation:["", [Validators.required]],
      gradeNum:["", [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
      affiliation:["",[Validators.required, Validators.pattern(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/)]]
    }, {
      validator: this.customValidation, //2
      });
    this.form.valueChanges.subscribe(data => {});
  };

  customValidation(group: FormGroup) { //3
    var password = group.get('password');
    var passwordConfirmation = group.get('passwordConfirmation');
    if(password.dirty && passwordConfirmation.dirty && password.value != passwordConfirmation.value){
        passwordConfirmation.setErrors({'match': true});
    }
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit(form:FormGroup ){
    if(this.form.valid){
    }
  }
}
