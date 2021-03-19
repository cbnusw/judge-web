import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnURL: string;

  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      ClassOf: ['', [Validators.required]],
      PassWord: ['', [Validators.required]]
    })
  }
  get f() { return this.form.controls; }

  ngOnInit(): void {


  }

  onSubmit() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ClassOf: this.form.value.ClassOf,
        PassWord: this.form.value.PassWord,
      }
    };
    this.router.navigate(['/info-pg'], navigationExtras);

  }

}