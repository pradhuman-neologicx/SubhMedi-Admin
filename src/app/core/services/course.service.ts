import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor( private http: HttpClient,
    private apiservice: ApiService,
    private jwtService: JwtService) { }

    // Anushka Courses API //
    updateCourseStatus(courseId: string, isActive: boolean): Observable<any> {
      const body = {
        "courseId": courseId,
        "isActive": isActive
      };
      return this.apiservice.putWithoutHeader('course/updateStatus', body); 
    }

    updateCoursesDetails(body:any){
      const headers = { 'content-type': 'application/json' };
      return this.apiservice.put("course/updateCourse",body,headers);
    }

    
  PostCourses(formData: any){
    const headers = { 'content-type': 'application/json' };
    return this.apiservice.post("course/createCourse", formData,headers);
  }


createEmployee():  Observable<any>{
  return this.apiservice.post('course/createCourse',{},{}); 
}




// Anushka Batches API //



// GetRollnumberApi(){
//   return this.apiservice.get("students/students-by-batch/6610d8561000e03bb7b96c4a");
// }



UpdateBatchestatus(batchId: string, isActive: boolean): Observable<any> {
  const body = {
    "batchId": batchId,
    "isActive": isActive
  };
  return this.apiservice.putWithoutHeader('batch/updateBatchStatus', body); 
}
PostBatches(formData: any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/createBatch", formData,headers);
}

updateBatch(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.put("batch/updateBatch",body,headers);
}

updatesessionStatus(sessionId: string, isActive: boolean): Observable<any> {
  const body = {
    "sessionId": sessionId,
    "isActive": isActive
  };
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.apiservice.post('sessions/updateStatus', body,headers); 
}
CreateSession(body: any){
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.apiservice.post("sessions/createSession", body,headers);
}
updateSession(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("sessions/updateSession",body,headers);
}



Getbatchassign(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/getAssignedBatch",body,headers);
}


Getbatchesfloor(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/getActiveNotAssignedBatch",body,headers);
}
Getassignuserfloor(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/assignMultipleBatchToUser",body,headers);
}
Unassignuserfloor(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/unassignUserFromBatch",body,headers);
}
Singleassignuserfloor(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/assignUserToBatch",body,headers);
}

// api code for dispatch material //


Addunitspost(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("dispatch-units/add-units",body,headers);
}
UpdateAddunitspost(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("dispatch-units/update-units",body,headers);
}


getDispatchedmaterial(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("dispatch-units/get-students",body,headers);
}


CreateUnitsIds(body: any){
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.apiservice.post("dispatch-units/units-by-course-subjects", body,headers);
}
dispatchstudents(body: any){
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.apiservice.post("dispatch-units/dispatch-material", body,headers);
}
Viewtabledispatchstudents(body: any){
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.apiservice.post("dispatch-units/dispatched-data", body,headers);
}

createtest(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("test-series/create-test",body,headers);
}
updatetest(body:any,testId:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.put("test-series/update-test/"+testId,body,headers);
}


getCourseNameid(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("masters/course-components-for-refund",body,headers);
}






GetpartytableApi() {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.apiservice.get("parties",headers);
}
GetpartyTypetableApi() {
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.apiservice.get("party-types",headers);
}




createPartyApi(body:any,): Observable<any> {
  const user = this.jwtService.getpanelUserId();
  const token = this.jwtService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });



  return this.apiservice.post(`parties`, body,  headers );
}

}


