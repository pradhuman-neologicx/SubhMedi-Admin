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


  changestatus(unit_id: string, status: any): Observable<any> {
    var user= this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      "unit_id": unit_id,
      "status": status
    };
    return this.apiservice.post(`change-unit-status`,body,   headers );
  }



  changesmaterialtatus(material_id: string, status: any): Observable<any> {
    var user= this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      "material_id": material_id,
      "status": status
    };
    return this.apiservice.post(`change-material-status`,body,   headers );
  }



  getProjectPartiesBalance(projectId: any, partyId: any, date_range?: any, start_date?: string, end_date?: string): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Retrieving the user ID
    const token = this.jwtService.getToken(); // Retrieving the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Creating the body object with optional fields
    const body = {
      'user_id': user,
      'project_id': projectId,
      'party_id': partyId,
      ...(date_range ? { 'date_range': date_range } : {}),
      ...(start_date ? { 'start_date': start_date } : {}),
      ...(end_date ? { 'end_date': end_date } : {}),
   
     
     
    };
    console.log('Request Body:', body);
  
    // Sending the POST request with the constructed body and headers
    return this.apiservice.post('project-party-detail', body, headers);
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
  


  gettransaction(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      'user_id': user,
      'project_id': project_id,
   
    };
  
    return this.apiservice.post(`transactions-list`, body,  headers );
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
  


  GetunitsApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-all-units",headers);
  }





  Getunitsformarray() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-units",headers);
  }




  GetpartynamelistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("suppliers",headers);
  }




  getsubcontractorParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'sub-contractor',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers );
  }



  getotherexpenseParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: '',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers );
  }


  





  getsalarytype(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'salary',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers );
  }





  getTransactionParty(projectId: any): Observable<any> {
    const userId = this.jwtService.getpanelUserId(); // Get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization

    // Construct the headers with the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Construct the URL with query parameters
    let url = `transaction-parties`;
    if (projectId) {
      url += `?project_id=${projectId}&user_id=${userId}`;
    }

    console.log('Constructed URL:', url);

    // Make the GET request using HttpClient
    return this.apiservice.get(url,  headers );
  }





  GetmattlistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-materials",headers);
  }


  GetmaterialApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-all-materials",headers);
  }


  createunits(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    
  
    return this.apiservice.post(`add-unit`, body,  headers );
  }


  updateunits(body:any,): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // const body = {
    //   unit_id: unit_id,
    // };
  
    return this.apiservice.post(`update-unit`, body,  headers );
  }



  updatematerials(body:any,): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // const body = {
    //   unit_id: unit_id,
    // };
  
    return this.apiservice.post(`update-material`, body,  headers );
  }




  getbalance(project_id: any, party_id:any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      'user_id': user,
      'project_id': project_id,
      'party_id': party_id,
   
    };
  
    return this.apiservice.post(`salary-amount`, body,  headers );
  }
  


  creatematerial(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
  
    return this.apiservice.post(`add-material`, body,  headers );
  }



  purchasematerials(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`purchase-materials`, body,  headers );
  }


  addsubcotractorpaymentout(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-out`, body,  headers );
  }
  addsubcotractorpaymenin(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-in`, body,  headers );
  }
}















// Method to update user status

 

