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

  GetState() {
    return this.apiservice.get('states');
  }



















// Method to update user status
updateUserStatus(userId: string, isActive: boolean): Observable<any> {
  const body = {
    "user_id": userId,
    "isActive": isActive.toString() // Convert boolean to string
  };
  const token = this.jwtService.getToken();

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
console.log(body);
console.log(headers);
  return this.apiservice.put("auth/updateStatus", body, headers);
}

updateUser(formData: FormData) {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'content-type': 'multipart/form-data' 
  });

return this.apiservice.put("auth/updateUser", formData, headers)
}




  createEmployee(formData: any){
    const headers = { 'content-type': 'multipart/form-data' };
    return this.apiservice.postWithoutHeader("auth/createUsers", formData);
  }
  
  GetRoles() {
    return this.apiservice.get("auth/getUserManagementRoles");
  }

  GetNewRegistrationA() {
    return this.apiservice.get("auth/getUsers");
  }

  GetUsers() {
    return this.apiservice.get("auth/getUsers");
  }

  getProfiledetails(formData: any){
    const headers = { 'content-type': 'application/json' };
    return this.apiservice.post("auth/getProfileById", formData,headers);
  }



  updateEmployee(formData: any,headers: any){
    return this.apiservice.put("auth/updateUser", formData,headers);
  }
  
  getsubjects() {
    return this.apiservice.get("masters/getSubjects");
  }

  Createmapbatches(body: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.apiservice.post("batch/getMappedAndUnmappedBatches", body,headers);
  }
  getclassrooms() {
    return this.apiservice.get("masters/classrooms");
  }
  
  getteachersbysubjectid(body: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.apiservice.post("masters/getTeachersBySubjectId", body,headers);
  }
 
  mapclassroonwithbatch(body: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.apiservice.post("batch/map-classroom-batches", body,headers);
  }

  BulkuploadEmployeeapi(formData:any){
    const headers = { 'content-type': 'application/json' };
    return this.apiservice.postWithoutHeader("imports/import-employees",formData);
  }


  BulkuploadBatchesapi(formData:any){
    const headers = { 'content-type': 'application/json' };
    return this.apiservice.postWithoutHeader("imports/import-batches",formData);
  }


  BulkuploadCourseapi(formData:any){
    const headers = { 'content-type': 'application/json' };
    return this.apiservice.postWithoutHeader("imports/import-courses",formData);
  }

  

  
  GetsubjectlistApi(body:any){
    return this.apiservice.get("masters/getSubjects",body);
  }

  updatePasswrodApi(formData: any, headers: any) {
    return this.apiservice.put("auth/updatePassword", formData, headers);
  }

 
}
