import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  private approvalStageMessage = new BehaviorSubject("");
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private jwtService: JwtService
  ) { }

  Login(formData: any, headers: any) {
    return this.apiservice.post("auth/logIn", formData, headers);
  }
  GetOtp(formData: any, headers: any) {
    return this.apiservice.post("auth/sendOtp", formData, headers);
  }


  ForgetOptVerify(formData: any, headers: any) {
    return this.apiservice.post("auth/verifyOtp", formData, headers);
  }


  ResetPassword(formData: any, headers: any) {
    return this.apiservice.put("auth/resetPassword", formData, headers);
  }



  studentlogin(formData: any, headers: any) {
    return this.apiservice.post("studentAuth/logIn", formData, headers);
  }



  StudentGetOtp(formData: any, headers: any) {
    return this.apiservice.post("studentAuth/sendOtp", formData, headers);
  }

  StudentOptVerify(formData: any, headers: any) {
    return this.apiservice.post("studentAuth/verifyOtp", formData, headers);
  }


  ResetPasswordStudent(formData: any, headers: any) {
    return this.apiservice.put("studentAuth/resetPassword", formData, headers);
  }

  updateBatchStudent(body:any, headers: any) {
    return this.apiservice.post("students/update-student-batch", body, headers);
  }

}
