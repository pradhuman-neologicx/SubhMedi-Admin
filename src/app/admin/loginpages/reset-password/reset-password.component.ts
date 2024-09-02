import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { ChangePassword, ChangePasswordresponse } from '../../../core/model-class/login-signup';
import { ApiService } from '../../../core/services/api.service';
import { DataService } from '../../../core/services/data.service';
import { JwtService } from '../../../core/services/jwt.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [
    trigger('succesfullyMesaage', [
      state('void', style({
        transform: 'translateX(-30%)',
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({
        transform: 'translateX(100%)', 
        opacity: 0 
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          transform: 'translateX(0)', // Final position for slide-in effect
          opacity: 1 // Final opacity
        }))
      ])
    ]), 
  ]
})
export class ResetPasswordComponent implements OnInit{
  activeLink: string = 'Login';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiservice: ApiService,
    private dataService: DataService,
    private jwtService: JwtService,
    private loginService:LoginService) {
    this.dataService.changeMessage({ message: "reset" });
  }

  ResetPassword!: FormGroup;
  Token!:String;
  ngOnInit() {
    this.Token = this.jwtService.getToken();
    this.ResetPassword = this.formBuilder.group({
      NewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator }
    );
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('NewPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword?.value !== confirmPassword?.value) {
      control.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    }

    return null;
  }

  openSecondsuccess: boolean = false;
  successName: any = "";
  // reset pasword code
  ChangePassword: ChangePassword = new ChangePassword();
  ChangePasswordresponse: ChangePasswordresponse = new ChangePasswordresponse();
  errorMessage: any;
  submitted!: boolean;
  erroroutput: boolean = false;
  userId: String = '';
  changePassword() {
    console.log(this.ResetPassword.value);
    if (this.ResetPassword.valid) {

      this.ChangePassword.password = this.ResetPassword.get('NewPassword')?.value;
      this.ChangePassword.confirmPassword = this.ResetPassword.get('confirmPassword')?.value;
      const headers = { 'content-type': 'application/json','Authorization':'Bearer ' +this.Token};
      const body = JSON.stringify(this.ChangePassword);

      console.log(body);

      this.loginService.ResetPassword(body, headers).subscribe((response: any) => {
        this.errorMessage = response.message;
        console.log(response);
        console.log("hi" + response);

        if (response.statusCode === 200) {
          const resSave = JSON.stringify(this.ChangePasswordresponse);
          // this.jwtService.saveUserDetails(resSave);
          this.submitted = true;
          console.log("success");
          this.successName = 'Password';
          this.openSecondsuccess = true;
          setTimeout(() => {
            this.router.navigate(["/sign_in"]);
          }, 1800);
      
          
        } else {
          this.erroroutput = true;
          this.submitted = false;
          console.log("fail");
        }
      });
    } else {
      this.errorMessage = 'Fill in all the details.';
    }
  }


  markAllAsTouched() {
    for (const control in this.ResetPassword.controls) {
      if (this.ResetPassword.controls.hasOwnProperty(control)) {
        this.ResetPassword.controls[control].markAsTouched();
      }
    }
  }

  isreset: boolean = false;
  closeModal() {
    this.openSecondsuccess = false;
  }
}
