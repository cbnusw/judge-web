import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';


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

  joinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    formBuilder: FormBuilder,
  ) {
    this.joinForm = formBuilder.group({
      no: [null],
      password: [null],
      confirmPassword: [null],
      info: formBuilder.group({
        name: [null],
        email: [null],
        phone: [null],
        department: [null],
      })
    });
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
      err => console.log(err)
    );
  }
}
