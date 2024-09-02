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

  


Emailverify(formData: any, headers: any) {
    return this.apiservice.post("login", formData,headers);
  }

  VerifyOTP(formData: any, headers: any) {
    return this.apiservice.post("verifyOtp", formData, headers);
  }

}
