import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  OtpVerify,
  SendOtp,
  SignINRes,
  SignIn,
} from 'src/app/core/model-class/login-signup';
import { Validations } from 'src/app/core/model-class/validations';
// import { ApiService } from 'src/app/core/services/api.service';
// import { DataService } from 'src/app/core/services/data.service';
// import { JwtService } from 'src/app/core/services/jwt.service';
// import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [
    trigger('succesfullyMesaage', [
      state(
        'void',
        style({
          transform: 'translateX(-30%)',
          opacity: 0,
        })
      ),
      transition(':enter, :leave', [
        animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)'),
      ]),
    ]),
    trigger('slideIn', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            transform: 'translateX(0)', // Final position for slide-in effect
            opacity: 1, // Final opacity
          })
        ),
      ]),
    ]),
  ],
})
export class SigninComponent {
  title = 'Login';
  Email!: string;
  activeLink: string = 'Login';
  isEmailCorrect: boolean = false;
  otp: string = '';
  openSecondsuccess: boolean = false;
  NewOTP: SendOtp = new SendOtp();
  OtpVerify: OtpVerify = new OtpVerify();
  validation: Validations = new Validations();

  onSubmit() {
    if (this.signinform.valid) {
      // Handle form submission here
      console.log(this.signinform.value);
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

  signinform!: FormGroup;
  EmailControl!: AbstractControl;
  loginAS!: number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) // private apiservice: ApiService,
  // private dataService: DataService,
  // private jwtService: JwtService,
  // private loginService: LoginService
  {}
  ngOnInit() {
    // this.jwtService.clearStorage();
    // this.loginAS = this.jwtService.getLoginAs();
    this.signinform = this.formBuilder.group({
      Email: [
        '',
        // [
        //   Validators.required,
        //   Validators.pattern(this.validation.email_pattern),
        //   Validators.email,
        // ],
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
  //   if (this.signinform.get('email')?.valid && this.signinform.get('email')?.value.length > 0) {
  //     this.showOTPField = true;
  //   }
  // }

  get verifyOtp() {
    return this.signinform.controls;
  }

  // Declare a variable to store the user ID
  userid!: string;
  // verify user
  otpValue: string = '';
  VerifyEmail() {
    this.router.navigate(['/dashboard']);
    // this.erroroutput = false;
    // if (this.signinform.valid) {
    //   this.signinform.get('otp')?.clearValidators();
    //   if (this.signinform.get('Email')?.value !== undefined) {
    //     this.NewOTP.email = this.signinform.get('Email')?.value;
    //     const headers = { 'content-type': 'application/json' };
    //     const body = JSON.stringify(this.NewOTP);
    //     console.log(body);
    //     this.loginService.Emailverify(body, headers).subscribe((response: any) => {
    //       this.errorMessage = response.message;
    //       console.log(response);
    //       if (response.status === 200) {
    //         this.EmailInput = true;
    //         this.signinform.get('otp')?.setValidators([Validators.required]);
    //         this.signinform.get('otp')?.updateValueAndValidity();
    //         console.log("email verify");
    //         this.showOTPField = true;
    //         this.showEditButton = true;
    //         this.erroroutput = false;
    //       } else {
    //         this.erroroutput = true;
    //       }
    //     });
    //   } else {
    //     this.erroroutput = true;
    //     this.errorMessage = 'Please enter email';
    //   }
    // } else {
    //   this.signinform.markAllAsTouched();
    // }
  }
  directRouct() {
    this.router.navigate(['/dashboard']);
  }
  // verfiy otp
  VerifyOtp() {
    this.router.navigate(['/dashboard']);
    // this.erroroutput = false;
    // if (this.signinform.valid) {
    //   this.OtpVerify.email = this.signinform.get('Email')?.value;
    //   this.OtpVerify.otp = parseInt(this.signinform.get('otp')?.value);
    //   const headers = { 'content-type': 'application/json' };
    //   const body = JSON.stringify(this.OtpVerify);
    //   console.log(body);

    //   this.loginService.VerifyOTP(body, headers).subscribe((response: any) => {
    //     console.log('otp failed');
    //     this.errorMessage = response.message;
    //     if (response.status === 200) {
    //       console.log('otp success');
    //       this.jwtService.saveToken(response.access_token);
    //       this.jwtService.savepanelUserId(response.data.user_id);
    //       this.jwtService.savePartyId(response.data.party_id);
    //       this.jwtService.saveName(response.data.name);
    //       this.jwtService.saveType(response.data.type);
    //       this.jwtService.isLoggedIn(true);
    //       this.router.navigate(['/dashboard'], {
    //         queryParams: { success: 'true' },
    //       });
    //       this.erroroutput = false;
    //     } else {
    //       this.erroroutput = true;
    //     }
    //   });
    // } else {
    //   this.erroroutput = true;
    //   this.errorMessage = 'You are using expire otp';
    //   this.signinform.markAllAsTouched();
    // }
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
    this.signinform.reset();
    this.showEditButton = false;
    this.showOTPField = false;
    this.EmailInput = false;
  }
  markAllAsTouched() {
    for (const control in this.signinform.controls) {
      if (this.signinform.controls.hasOwnProperty(control)) {
        this.signinform.controls[control].markAsTouched();
      }
    }
  }
  closeModal() {
    this.openSecondsuccess = false;
  }
}
