import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
interface FormClass{
  id: string, title: string, subMessage: string, password?: boolean, left?:boolean, right?:boolean
}


export const checkConfirmPassword: any = (control: FormGroup): void => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  password.dirty && confirmPassword.dirty && password.value !== confirmPassword.value ? confirmPassword.setErrors({ match: true }) : null;
};

@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})

export class JoinPageComponent implements OnInit {
  joinForm;
  formSelected = new EventEmitter();
  formClass:Array<FormClass> = [
        {id : 'id', title:'아이디', subMessage:'4글자 이상, 영문 숫자 조합'},
        {id : 'password', title:'비밀번호', subMessage:'8글자 이상, 영문 숫자 특수문자 조합', password: true, left: true},
        {id : 'confirmPassword', title:'비밀번호 확인', subMessage:'비밀번호와 일치하게 적어주세요', password: true, right: true},
        {id : 'name', title:'이름', subMessage:'ex)홍길동'},
        {id : 'gradeNum', title:'학번', subMessage:'ex)2021039000'},
        {id : 'COC', title:'단과대학', subMessage:''},
        {id : 'department', title:'학과', subMessage:''},
        {id : 'email', title:'이메일', subMessage:'ex)example23@sample.com'}
  ];

  formErrorMessages = {
    'id': {
      'pattern': '입력 불가능한 문자가 포함되어 있습니다.',
      'duplicationCheck' : '중복검사를 해주세요.',
      'duplication' : '중복된 아이디 입니다.',
    },
    'name': {
      'pattern': '2글자 이상 입력해주세요.',
    },
    'email': {
      'pattern': '올바른 이메일 형식이 아닙니다.',
      'duplication' : '이미 가입된 정보입니다.',
    },
    'password': {
      'pattern': '8글자 이상 숫자와 문자 및 특수문자를 포함해주세요.',
    },
    'confirmPassword': {
    },
    'gradeNum': {
      'duplication' : '이미 가입된 정보입니다.',
    },
    'COC': {
      'required': '필수항목입니다.',
    },
    'department': {
      'required': '필수항목입니다.',
    }
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
    ){}

  updateFormErrors(form: FormGroup, formErrors: any, formErrorMessages: any):void {
  }



  ngOnInit(): void { 
    this.joinForm = new FormGroup({
    id: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^[A-Za-z0-9_\-]{4,}$/)]),
    name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z가-힣_\-]{2,}$/)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
    gradeNum: new FormControl('', [Validators.required,Validators.pattern(/^[0-9_\-]{10}$/)]),
    email: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/)]),
    COC: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    },
    {validators: checkConfirmPassword})
    this.joinForm.valueChanges.subscribe(data => {
      this.updateFormErrors(this.joinForm, this.formErrors, this.formErrorMessages);
    });
  }

  onSubmit(value: FormGroup){
    console.log(this.joinForm.getError('match'))
    if(this.joinForm.valid)console.log("valid");
  }
}
