import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendOtp, OtpVerify } from 'src/app/core/model-class/login-signup';
import { Validations } from 'src/app/core/model-class/validations';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})



export class OtpComponent{
  title = "Login";
  Email: string = '';
  activeLink: string = 'Login';
  isEmailCorrect: boolean = false;
  otp: string = '';
  NewOTP: SendOtp = new SendOtp();
  OtpVerify: OtpVerify = new OtpVerify();
  validation: Validations = new Validations();

  onSubmit() {
    if (this.ForgotForm.valid) {
      // Handle form submission here
      console.log(this.ForgotForm.value);
    }
    // You can perform form submission and validation here.
    if (this.Email && this.otp) {
      // Perform the action when both mobile number and OTP are provided.
      // For example, you can send the data to the server or navigate to the next page.
      console.log(
        'Form submitted with mobile number:',
        this.Email,
        'and OTP:',
        this.otp
      );
    } else {
      // Handle the case where either the mobile number or OTP is missing.
      console.log('Please fill in both mobile number and OTP fields.');
    }
  }

  ForgotForm!: FormGroup;
  EmailControl!: AbstractControl;
  loginAS!: number;
  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private apiservice: ApiService,
    private dataService: DataService,
    private jwtService: JwtService,
    private loginService: LoginService
  ) { }
  ngOnInit() {
    this.loginAS = this.jwtService.getLoginAs();
    this.ForgotForm = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.email_pattern),
          Validators.email,
        ],
      ],
      otp: [
        '',
        // [Validators.required,],
      ],
    });
  }
  employerid: boolean = false;
  erroroutput: boolean = false;
  matched: boolean = false;
  errorMessage: any;
  statusCode!: number;
  otpSession: any;
  otpPin: any;
  showOTPField: boolean = false;
  EmailInput: boolean = false;


  // onContinue() {
  //   if (this.ForgotForm.get('email')?.valid && this.ForgotForm.get('email')?.value.length > 0) {
  //     this.showOTPField = true;
  //   }
  // }


  get verifyOtp() {
    return this.ForgotForm.controls;
  }

  // Declare a variable to store the user ID
  userid!: string
  // verify user
  otpValue: string = '';
  VerifyEmail() {
    this.erroroutput = false;
    if(this.ForgotForm.valid){
      this.ForgotForm.get('otp')?.clearValidators();
      if (this.ForgotForm.get('Email')?.value !== undefined) {
        this.NewOTP.email = this.ForgotForm.get('Email')?.value;
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(this.NewOTP);
        console.log(body);
        this.loginService.Emailverify(body, headers).subscribe((response: any) => {
          this.errorMessage = response.message;
          console.log(response);
          if (response.status === 200) {
            this.EmailInput = true;
            this.ForgotForm.get('otp')?.setValidators([Validators.required]);
            this.ForgotForm.get('otp')?.updateValueAndValidity();
          console.log("email verify");
            this.showOTPField = true;
            this.showEditButton = true;
            this.erroroutput = false;
          } else {
            this.erroroutput = true;
          }
        });
      } else {
        this.erroroutput = true;
        this.errorMessage = 'Please enter email';
      }
    }else{
      this.ForgotForm.markAllAsTouched();
    }
  
  }

 


  // verfiy otp
  VerifyOtp() {
    this.erroroutput = false;
    if (this.ForgotForm.valid) {
        this.OtpVerify.email = this.Email;
        this.OtpVerify.otp = parseInt(this.ForgotForm.get('otp')?.value);
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(this.OtpVerify);
        console.log(body);
        
        this.loginService.VerifyOTP(body, headers).subscribe((response: any) => {
            console.log("hi");
            this.errorMessage = response.message;
            if (response.statusCode === 200) {
                console.log(response.data.user_id);
                this.jwtService.saveToken(response.data.token);
                this.jwtService.savepanelUserId(response.data.userid);
                this.dataService.changeMessage({ message: "reset" });
                this.router.navigate(["reset_password"]);
                this.erroroutput = false;
            } else {
                this.erroroutput = true;
            }
        });
    } else {
        this.erroroutput = true;
        this.errorMessage = 'You are using expire otp';
        this.ForgotForm.markAllAsTouched();
    }
}




  timer: number = 60;
  disableResend: boolean = true;
  startTimer() {
    this.timer = 60;
    this.disableResend = true;

    const interval = setInterval(() => {
      this.timer--;

      if (this.timer === 0) {
        clearInterval(interval);
        this.disableResend = false;
      }
    }, 1000);
  }
  showEditButton: boolean = false;
  resetForm() {
    this.ForgotForm.reset();
    this.showEditButton = false;
    this.showOTPField = false;
    this.EmailInput = false;
  }
  markAllAsTouched() {
    for (const control in this.ForgotForm.controls) {
      if (this.ForgotForm.controls.hasOwnProperty(control)) {
        this.ForgotForm.controls[control].markAsTouched();
      }
    }
  }
}