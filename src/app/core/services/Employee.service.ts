import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
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
    private jwtService: JwtService,
    private router: Router
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
    return this.apiservice.post(`ongoing-projects`,body,   headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`change-unit-status`,body,   headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`change-material-status`,body,   headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post('project-party-detail', body, headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  

  getPartiesproject( partyId: any,search:any, date_range?: any ): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Retrieving the user ID
    const token = this.jwtService.getToken(); // Retrieving the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Creating the body object with optional fields
    const body = {
      'user_id': user,
    
      'party_id': partyId,
          "search":search!=undefined?search:"",
      ...(date_range ? { 'date_range': date_range } : {}),
      
    
     
     
    };
    console.log('Request Body:', body);
  
    // Sending the POST request with the constructed body and headers
    return this.apiservice.post('party-projects', body, headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );

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
  
    return this.apiservice.post(`project-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  


  gettransaction(project_id: any, transaction_type:any,search: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      'user_id': user,
      'project_id': project_id,
      "search":search!=undefined?search:"",
      ...(transaction_type ? { 'transaction_type': transaction_type } : {}),
      // 'transaction_type': transaction_type,

    };
  
    return this.apiservice.post(`transactions-list`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  



  GetState() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("states",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }




  getattendace(project_id: any,date:any, partytype:any,search:any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      'user_id': user,
      'project_id': project_id,
      "date":date,
      "search":search!=undefined?search:"",
      ...(partytype ? { 'party_type': partytype } : {}),
      // 'transaction_type': transaction_type,
  
    };
  
    return this.apiservice.post(`attendance`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`cities`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }




  GetStaff() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("staffs", headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  createProject(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Make the POST request to the server
    return this.apiservice.post(`projects`, requestbody,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  


  GetunitsApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-all-units",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }





  Getunitsformarray() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-units",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }




  GetpartynamelistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("suppliers",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  


  getlaboiurParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'labour_expense',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }




  getwaterParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'water_expense',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  getmaintainanceParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'maintenance_expense',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  getelectricParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'electric_expense',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }



  getfuelParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'fuel_expense',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  getsupervisorParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      type: 'supervisor_payment',
      user_id: user,
    project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.post(`list-parties`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
    return this.apiservice.get(url,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }





  GetmattlistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-materials",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  GetmaterialApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.apiservice.get("get-all-materials",headers)
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  createunits(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    
  
    return this.apiservice.post(`add-unit`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
  
    return this.apiservice.post(`update-unit`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
  
    return this.apiservice.post(`update-material`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
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
  
    return this.apiservice.post(`salary-amount`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  


  creatematerial(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
  
    return this.apiservice.post(`add-material`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }



  purchasematerials(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`purchase-materials`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }


  addsubcotractorpaymentout(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-out`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
  addsubcotractorpaymenin(body:any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });

    

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-in`, body,  headers )
    .pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        if (
          error.status === 422 &&
          error.message &&
          (
            error.message.includes('The selected user id is invalid') ||
            error.message.includes('Your account has been deactivated') ||
            error.message.includes('Your token has been expired') ||
            error.message.includes('Your token has been expired. Please login again.')
          )
        ) {
          // Log the user out and navigate to sign-in page
          this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
          this.router.navigate(['/sign_in']); // Navigate to home route
          alert(error.message); // Show alert with error message
        } else if (error && error.message) {
          // Display error message
          alert(error.message);
        } 
      })
    
    );
  }
}















// Method to update user status

 

