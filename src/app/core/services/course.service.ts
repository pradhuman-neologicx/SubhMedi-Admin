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

GetCourseType() {
  return this.apiservice.get("course/getCourseTypes");
}

GetClasses() {
  return this.apiservice.get("course/getClasses");
}
GetNewCourses() {
  return this.apiservice.get("course/getCourseList");
}

createEmployee():  Observable<any>{
  return this.apiservice.post('course/createCourse',{},{}); 
}




// Anushka Batches API //
Getbatch() {
  return this.apiservice.get("batch/getBatchesList");
}
GetbatchName() {
  return this.apiservice.get("course/getCourseList");
}


GetRollnumberApi(id:any){
  return this.apiservice.get("students/students-by-batch/"+id);
}


// GetRollnumberApi(){
//   return this.apiservice.get("students/students-by-batch/6610d8561000e03bb7b96c4a");
// }



GetbatchMode() {
  return this.apiservice.get("batch/getDeliveryList");
}
GetbatchShift() {
  return this.apiservice.get("batch/getShiftList");
}

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
GetCurrentSessionID() {
  return this.apiservice.get("masters/getCurrentSessions");

}
updateBatch(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.put("batch/updateBatch",body,headers);
}


// anushka code for sessions //
Getsessions(){
  return this.apiservice.get("sessions/getSessions");
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



Getbatchlist() {
  return this.apiservice.get("batch/getBatchesList");
}
Getbatchassign(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("batch/getAssignedBatch",body,headers);
}

GetFloorType() {
  return this.apiservice.get("batch/getActiveFloorInchargeUsers");
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
GetUnits() {
  return this.apiservice.get("dispatch-units/units");
}

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
GetfeeCourses() {
  return this.apiservice.get("masters/fee-courses-components");
}

getCourseNameid(body:any){
  const headers = { 'content-type': 'application/json' };
  return this.apiservice.post("masters/course-components-for-refund",body,headers);
}







Getstudenttts(sessionId:any,courseId:any,BatchId:any) {
    
  let url = 'students/get-students/' + sessionId;
  if (courseId != undefined && BatchId == undefined) {
     url = url + '?courseId=' + courseId;

  } else if (BatchId != undefined && courseId == undefined) {
 
    url = url + '?batchId=' + BatchId;
  } else if (BatchId != undefined && courseId != undefined) {

   //  url = url + '?from=' + from+'&to='+to;
    if (courseId.length > 0 && BatchId.length <= 0) {
      url = url + '?courseId=' + courseId;
    } else if (BatchId.length > 0 && courseId.length <= 0) {
      url = url + '?batchId=' + BatchId;
    } else if (BatchId.length > 0 && courseId.length > 0) {
      url = url + '?courseId=' + courseId + '&batchId=' + BatchId;
    }
  }
  console.log(url);
   return this.apiservice.get(
    url
   );
}





  Getstudentpagination(sessionId:any,courseId:any,BatchId:any,tableSize:any, page:any) {
    
    let url = 'students/get-students/' + sessionId+'?limit=' +tableSize+ "&page=" +page;
    if (courseId != undefined && BatchId == undefined) {
       url = url + '&courseId=' + courseId;
  
    } else if (BatchId != undefined && courseId == undefined) {
   
      url = url + '&batchId=' + BatchId;
    } else if (BatchId != undefined && courseId != undefined) {
  
     //  url = url + '?from=' + from+'&to='+to;
      if (courseId.length > 0 && BatchId.length <= 0) {
        url = url + '&courseId=' + courseId;
      } else if (BatchId.length > 0 && courseId.length <= 0) {
        url = url + '&batchId=' + BatchId;
      } else if (BatchId.length > 0 && courseId.length > 0) {
        url = url + '&courseId=' + courseId + '&batchId=' + BatchId;
      }
    }



  console.log(url);
   return this.apiservice.get(
    url
   );
 }


 Getstudentsearch(sessionId:any,courseId:any,BatchId:any,tableSize:any, page:any,searchText:any) {
    
  let url = 'students/get-students/' +sessionId+'?limit=' +tableSize+ "&page=" +page+ "&search="+searchText;
  if (courseId != undefined && BatchId == undefined) {
     url = url + '&courseId=' + courseId;

  } else if (BatchId != undefined && courseId == undefined) {
 
    url = url + '&batchId=' + BatchId;
  } else if (BatchId != undefined && courseId != undefined) {

   //  url = url + '?from=' + from+'&to='+to;
    if (courseId.length > 0 && BatchId.length <= 0) {
      url = url + '&courseId=' + courseId;
    } else if (BatchId.length > 0 && courseId.length <= 0) {
      url = url + '&batchId=' + BatchId;
    } else if (BatchId.length > 0 && courseId.length > 0) {
      url = url + '&courseId=' + courseId + '&batchId=' + BatchId;
    }
  }



console.log(url);
 return this.apiservice.get(
  url
 );
}
}




