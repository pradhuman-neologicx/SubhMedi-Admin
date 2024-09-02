import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignINRes, SignIn } from 'src/app/core/model-class/login-signup';
import { Validations } from 'src/app/core/model-class/validations';
import { FeesManagementService } from 'src/app/core/services/Fees.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
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
export class SigninComponent{
  title = "Login";
  login!: string;

  Onselectlogin(value: any) {
    this.login = value;
  }
  signIn!: FormGroup;
  openSecondsuccess: boolean = false;
  successName: any = "";

  constructor(

    private apiservice: ApiService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private loginService: LoginService,
    private feesManagementService: FeesManagementService,

  ) {
    this.dataService.changeMessage({ message: "profile" });
  }
  validation: Validations = new Validations();
  loginAS!: number;
  ngOnInit(): void {
    this.jwtService.clearStorage();
        this.signIn = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.email_pattern),
          Validators.email,
        ],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],


    },);
  }

  SignIn: SignIn = new SignIn();
  SignINRes: SignINRes = new SignINRes();
  errorMessage: any;
  showErrorMessage: boolean = false;
  submitted!: boolean;
  isAdminLogin: boolean = false;
  loginType!: number;
  sessionId!: string;





  Login() {
    if (this.signIn.valid) {
      console.log(2);
      if (this.signIn.get('Email')?.invalid || this.signIn.get('Password')?.invalid) {
        console.error('Form is invalid. Please check the entered values.');
        this.errorMessage = 'Please fill Correct Details';
        this.showErrorMessage = true;
      } else {
        this.SignIn.email = this.signIn.get('Email')?.value;
        this.SignIn.password = this.signIn.get('Password')?.value;
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(this.SignIn);
        console.log(body);
        this.loginService.Login(body, headers).subscribe((response: any) => {
          console.log('Response from server:', response);
          this.errorMessage = response.errorMessage;
          if (response.statusCode === 200) {
          this.getCurrentSession(response);

          }
          else {
            console.error('Login  unsucesses:',);
            this.errorMessage = 'Invalid mobile number or password. Please try again.';
            this.submitted = false;
            this.showErrorMessage = true;
          }
        });
      }
    }
    else {
      this.errorMessage = 'fill all the details Correctly';
      this.markAllAsTouched();
    }

  }

  getCurrentSession(Loginresponse:any) {
    this.feesManagementService.Getsession().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.sessionId = response.data.id;
        console.log(this.sessionId);
        this.jwtService.saveSession(this.sessionId);
        this.jwtService.saveSessionStartdate(response.data.startDate);
        this.jwtService.saveSessionEnddate(response.data.endDate);
        // this.LoginResponses(Loginresponse);
        this.LoginResponses(Loginresponse);
      }
    });
  }



  // LoginRes(response:any){
  //   this.SignINRes.userId = response.data.userId;
  //   this.SignINRes.name = response.data.name;
  //   this.SignINRes.email = response.data.email;
  //   this.SignINRes.mobileNumber = response.data.mobileNumber;
  //   this.SignINRes.role = response.data.role;
  //   this.SignINRes.token = response.data.token
  //   this.jwtService.savepanelUserId(response.data.userId);
  //   this.jwtService.saveToken(response.data.token);
  //  this.jwtService.saveName(response.data.name);
  //   this.jwtService.isLoggedIn(true);
  //   const resSave = JSON.stringify(this.SignINRes);
  //   let AdminRole = false;
  //   let FrontOfficeRole = false;
  //   let BackOfficeRole = false;

  //   // Check roles
  //   response.data.roles.forEach((role: any) => {
  //       if (role.roleName === "Admin") {
  //         AdminRole = true;
  //       } else if (role.roleName === "Front_Office") {
  //         FrontOfficeRole = true;
  //       } else if (role.roleName === "Back_Office") {
  //         BackOfficeRole = true;
  //       }
  //   });

  //   if (AdminRole) {
  //       this.jwtService.saveLoginAs(0);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       console.log("admin")
  //       this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //   } else if (FrontOfficeRole) {
  //       this.jwtService.saveLoginAs(1);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //   } else if (BackOfficeRole) {
  //       this.jwtService.saveLoginAs(2);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //   }
  
  // }

  LoginResponses(response: any) {
    // this.SignINRes.userId = response.data.userId;
    // this.SignINRes.name = response.data.name;
    // this.SignINRes.email = response.data.email;
    // this.SignINRes.mobileNumber = response.data.mobileNumber;
    // // this.SignINRes.roles = response.data.roles.map(role => role.roleName);
    // this.SignINRes.token = response.data.token;
    this.jwtService.savepanelUserId(response.data.userId);
    this.jwtService.saveToken(response.data.token);
    this.jwtService.saveName(response.data.name);
    this.jwtService.saveRoles(response.data.roles); // Save roles as an array
    this.jwtService.isLoggedIn(true);
    this.submitted = true;
    this.successName = 'Login';

    this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
}














  // LoginResponses(response:any){
  //     this.SignINRes.userId = response.data.userId;
  //     this.SignINRes.name = response.data.name;
  //     this.SignINRes.email = response.data.email;
  //     this.SignINRes.mobileNumber = response.data.mobileNumber;
  //     this.SignINRes.role = response.data.role;
  //     this.SignINRes.token = response.data.token
  //     this.jwtService.savepanelUserId(response.data.userId);
  //     this.jwtService.saveToken(response.data.token);
  //    this.jwtService.saveName(response.data.name);
  //     this.jwtService.isLoggedIn(true);
  //     const resSave = JSON.stringify(this.SignINRes);
  //     if (response.data.role == "admin") {
  //       // this.jwtService.saveLoginAdmin(resSave);
  //       this.jwtService.saveLoginAs(0);
 
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedAdmin(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //         // this.showErrorMessage = false;
  //       // }, 1800);



  //     }
  //     else if (response.data.role == "front_office") {
  //       // this.jwtService.saveLoginFrontOffice(resSave);
  //       this.jwtService.saveLoginAs(1);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedFloorInchare(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }

  //     else if (response.data.role == "back_office") {
  //       // this.jwtService.saveLoginBackoffice(resSave);
  //       this.jwtService.saveLoginAs(2);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedBackoffice(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }

  //     else if (response.data.role == "floor_incharge") {
  //       // this.jwtService.saveLoginFloorInchare(resSave);
  //       this.jwtService.saveLoginAs(3);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedFloorInchare(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }

  //     else if (response.data.role == "account_executive") {
  //       // this.jwtService.saveLoginAccountExecutive(resSave);
  //       this.jwtService.saveLoginAs(4);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedAccountExecutive(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);

      
  //     }


  //     else if (response.data.role == "ceo") {
  //       // this.jwtService.saveLoginCEO(resSave);
  //       this.jwtService.saveLoginAs(5);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedCEO(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }



  //     else if (response.data.role == "teacher") {
  //       // this.jwtService.saveLoginTeacher(resSave);
  //       this.jwtService.saveLoginAs(6);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedTeacher(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }

  //     else if (response.data.role == "test_series_executive") {
  //       // this.jwtService.saveLoginTestSeriesEx(resSave);
  //       this.jwtService.saveLoginAs(7);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       // this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedTestExecutive(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //       //   this.showErrorMessage = false;
  //       // }, 1800);
  //     }



  //     else if (response.data.role == "student") {
  //       // this.jwtService.saveLoginStudent(resSave);
  //       this.jwtService.saveLoginAs(8);
  //       // this.jwtService.savepanelUserId(response.data.userId);
  //       // this.jwtService.saveToken(response.data.token);
  //       this.submitted = true;
  //       this.successName = 'Login';
  //       this.openSecondsuccess = true;
  //       // setTimeout(() => {
  //         // this.jwtService.setLoggedStudent(true);
  //         this.router.navigate(['/dashboard'], { queryParams: { success: 'true' } });
  //     //     this.showErrorMessage = false;
  //     //   }, 1800);
  //      }

    
  // }



  markAllAsTouched() {
    for (const control in this.signIn.controls) {
      if (this.signIn.controls.hasOwnProperty(control)) {
        this.signIn.controls[control].markAsTouched();
      }
    }
  }
  password: string = "password";
  show: boolean = false;



  closeModal() {
    this.openSecondsuccess = false;
  }
}
















