import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';


export const checkConfirmPassword  = (control: FormGroup): void =>{
    console.log(1)
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    password.dirty && confirmPassword.dirty && password.value !== confirmPassword.value ? confirmPassword.setErrors({'match' :true}) : null;

};

@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})

export class JoinPageComponent implements OnInit {

  joinForm: FormGroup;

  
  constructor(
    private authService: AuthService,
    private router: Router,
    formBuilder: FormBuilder,
  ) {
    this.joinForm = formBuilder.group({
      no: [null,[Validators.required,Validators.pattern(/^[0-9_\-]{10}$/)]],
      password: [null,[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/)]],
      confirmPassword: [null,Validators.required],
      info: formBuilder.group({
        name: [null,[Validators.required,Validators.pattern(/^[A-Za-z가-힣_\-]{2,}$/)]],
        email: [null,[Validators.required,Validators.email]],
        phone: [null,[Validators.required,Validators.pattern(/^01([0|1|6|7|8|9]?)([0-9]{7,8})$/)]],
        department: [null,Validators.required],
      },
      ) 
    });
    this.joinForm.valueChanges.subscribe(data=>{
      checkConfirmPassword(this.joinForm)
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.joinForm.invalid) {

      return;
    }

    const user: User = this.joinForm.getRawValue();

    this.authService.join(user).subscribe(
      () => this.router.navigateByUrl('/account/login'),
      err => {
        this.authService.checkDuplicate(user).subscribe(res=> {
          if(res.no)this.joinForm.get('no').setErrors({'duplicate':true});
          if(res.email)this.joinForm.get('info').get('email').setErrors({'duplicate':true});
          if(res.phone)this.joinForm.get('info').get('phone').setErrors({'duplicate':true});
        })
      }
    );
  }
}
