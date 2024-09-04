import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  
  private approvalStageMessage = new BehaviorSubject("");
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();
  GetBatches: any;
  updateBatches: any;
  GetCourseType: any;

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private jwtService: JwtService
  ) { }
 



   getOngoingProject(search:any): Observable<any> {
    var user= this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body={
      "user_id":user,
       "search":search!=undefined?search:""
  }
    return this.apiservice.post(`ongoing-projects`,body,   headers );
  }




  getProjectParties(project_id: any, search: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      'user_id': user,
      'project_id': project_id,
      "search":search!=undefined?search:""
    };
  
    return this.apiservice.post(`project-parties`, body,  headers );
  }
  





  GetState() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("states",headers);
  }



  getCity(state_id: any): Observable<any> {
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      state_id: state_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`cities`, body,  headers );
  }




  GetStaff() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("staffs", headers);
  }


  getClientParties(): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'client',
      user_id: user,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers );
  }


  createProject(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Make the POST request to the server
    return this.apiservice.post(`projects`, requestbody,  headers );
  }
  


}















// Method to update user status

 

