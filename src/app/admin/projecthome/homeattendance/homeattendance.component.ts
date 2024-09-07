import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { DataService } from 'src/app/core/services/data.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-homeattendance',
  templateUrl: './homeattendance.component.html',
  styleUrl: './homeattendance.component.scss',
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

    trigger('fadeIn', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.5)' // Start with smaller size
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          opacity: 1,
          transform: 'scale(1)' // Final size
        }))
      ])
    ])


  ]
})



export class HomeattendanceComponent {
  CalendarForm!: FormGroup;
  searchbarform!: FormGroup;
  maxDate: Date;
  addworkforceform!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private courseService: CourseService,
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) {
    this.maxDate = new Date();
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    this.projectiD = router.url.slice(0).split(urlDelimitators)[2];

  }

  AddWorkerForm!: FormGroup;
  UpdatelabourForm!: FormGroup;
  userId: any;
  projectiD: any;
  todayDate: any;
  ngOnInit(): void {
    // this.projectiD = this.route.snapshot.paramMap.get('id');
    this.userId = this.jwtService.getpanelUserId();
    this.todayDate = new Date(Date.now()).toISOString().split('T')[0];
    this.CalendarForm = this.formBuilder.group({
      Caledardate: [this.todayDate,
      [
        Validators.required,
      ],
      ],
    },);
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });

    this.AddWorkerForm = this.formBuilder.group({
      PartyType: ["", [Validators.required,]],
      StaffList: ["",],
      Salary: ["",],
      labourstafflist: [],
    });

    this.addworkforceform = this.formBuilder.group({
      WorkerType: ["", [Validators.required,]],
      Salary: ["", [Validators.required,]]
    });


    this.getShiftfun();

    // this.GetStaffFun();






    this.GetPartyType();
    this.GetAttendanceFun();
  }

  get todayDateMax() {
    return new Date(Date.now()).toISOString().split('T')[0];
  }
  newdateV: any;
  DateChange(event: any) {
    console.log(event);
    let newdate = formatDate(Date.parse(event), 'yyyy-MM-dd', 'en-US');
    this.todayDate = newdate;
    console.log(newdate);
    this.GetAttendanceFun();
  }



  searchfun() {
    this.showreset = true;
  }


  resetsearchbar() {

  }


  showreset: any = false;
  totalPresent: any;
  totalAbsent: number = 0;
  totalNetAmount: number = 0;
  workertable: any
  Attendancetable: any;
  // projectiD: any;
  GetAttendanceFun() {
    // staticid "16","17","2024-09-05"


    // const caledardateValue = this.CalendarForm.get('Caledardate')?.value;
    // const formattedDate = caledardateValue ? new Date(caledardateValue).toISOString().split('T')[0] : '';

    this.courseService.getAttendacneAPI(this.projectiD, this.userId, this.todayDate).subscribe((response: any) => {
      console.log(this.CalendarForm.get('Caledardate')?.value);
      console.log(this.projectiD);
      if (response.status === 200) {
        this.Attendancetable = response.data;
        this.totalPresent = response.total_present ?? 0;
        this.totalAbsent = response.total_absent ?? 0;
        this.totalNetAmount = response.total_net_amount ?? 0;
        console.log(this.totalPresent);
        this.workertable = this.Attendancetable.flatMap((attendance: any) => attendance.workforces || []);
      }
    });
  }

  ViewDetailopen: boolean = false;

  OpenViewDetails(partyId: any): void {
    this.ViewDetailopen = true;
    this.currentpartyId = partyId;
  }

  closeviewdetial() {
    this.ViewDetailopen = false;
  }

  closeModal() {
    this.UpdateLabourContractor = false;
    this.MarkPresent = false;
    this.Markabsent = false;
    this.addworkeropen = false;
    this.addworkforceopen = false;
  }



  addworkeropen: boolean = false;

  addworkforceopen: boolean = false;
  UpdateLabourContractor: boolean = false;

  AddopenWorker(): void {
    this.addworkeropen = true;
  }


  AddopenWorkeforce(): void {
    this.addworkforceopen = true;
  }





  PartTypeList: any;

  GetPartyType() {
    this.courseService.GetpartyTypetableApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.PartTypeList = response.party_types;
        this.filteredPartyTypes = this.filterPartyTypes(this.PartTypeList);

        // Check if 'staff' is present in the filteredPartyTypes
        if (this.filteredPartyTypes.some((type: any) => type.name.toLowerCase() === 'staff')) {

        }
      }
      console.log(this.PartTypeList);
    });
  }



  filteredPartyTypes: any;
  filterPartyTypes(partyTypes: any[]): any[] {
    // Define the types you want to filter
    const typesToInclude = ['staff', 'labour', 'labour contractor'];
    return partyTypes.filter(type => typesToInclude.includes(type.name.toLowerCase()));
  }

  partyTypeName: any
  partyTypeNameupdate: any;
  staffselect(value: any) {
    this.partyTypeName = value
    if (value == "staff" || value == "labour") {
      this.GetStaffFun(value);
      this.updateEmailValidators();
    }
    else if (value == "labour contractor") {

      this.GetStaffFun('labour-contractor');
      this.updatelabourcontractor();
    }

  }

  updateEmailValidators() {
    this.AddWorkerForm.get('StaffList')?.clearValidators();
    this.AddWorkerForm.get('Salary')?.clearValidators();
    if (this.partyTypeName === 'staff') {
      this.AddWorkerForm.get('StaffList')?.setValidators([Validators.required,]);
      this.AddWorkerForm.get('Salary')?.setValidators([Validators.required,]);

    } else {
      this.AddWorkerForm.get('StaffList')?.clearValidators();
      this.AddWorkerForm.get('Salary')?.clearValidators();


    }

    this.AddWorkerForm.get('StaffList')?.updateValueAndValidity();
    this.AddWorkerForm.get('Salary')?.updateValueAndValidity();
  }









  updatelabourcontractor() {
    this.AddWorkerForm.get('StaffList')?.clearValidators();
    this.AddWorkerForm.get('labourstafflist')?.clearValidators();
    if (this.partyTypeName === 'labour contractor') {
      this.AddWorkerForm.get('StaffList')?.setValidators([Validators.required,]);
      this.AddWorkerForm.get('labourstafflist')?.setValidators([Validators.required,]);


    } else {
      this.AddWorkerForm.get('StaffList')?.clearValidators();
      this.AddWorkerForm.get('labourstafflist')?.clearValidators();

    }
    this.AddWorkerForm.get('StaffList')?.updateValueAndValidity();
    this.AddWorkerForm.get('labourstafflist')?.updateValueAndValidity();

  }


  // Typestafflist 
  Stafflist: any;
  GetStaffFun(type: any) {
    this.courseService.GetStaffApi(this.projectiD, type).subscribe((response: any) => {
      console.log(this.projectiD);
      if (response.status === 200) {
        this.Stafflist = response.parties;
      }

    });
  }


  labourcontractorstaff(id: any) {
    if (this.partyTypeName === 'labour contractor') {
      this.GetStafflabourcontractorfun(id);
    }
  }

  labourstafflist: any;
  GetStafflabourcontractorfun(type: any) {
    this.courseService.GetStafflabourcontractorapi(type, this.projectiD).subscribe((response: any) => {
      console.log(this.projectiD);
      if (response.status === 200) {
        this.labourstafflist = response.workforces;
      }
    });
  }








  successName: any = "";
  openSecondsuccess = false;
  CreateWorkerfun() {
    if (this.AddWorkerForm.valid) {
      if (this.partyTypeName == 'staff' || this.partyTypeName == 'labour') {


        const body = {
          "party_id": this.AddWorkerForm.get("StaffList")?.value,
          "project_id": this.projectiD,
          "user_id": this.userId,

          // "workforce_ids":this.AddWorkerForm.get("PartyType")?.value,
          "amount": this.AddWorkerForm.get("Salary")?.value,
        }

        console.log(body);

        this.courseService.CreateWorkerapi(body).subscribe((response: any) => {
          console.log(response);
          if (response.status === 200) {
            console.log("success");
            this.closeModal();
            this.successName = 'Create Worker';
            this.ngOnInit();
            this.GetAttendanceFun();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          }
        });
      }

      else if (this.partyTypeName == 'labour contractor') {


        const body = {
          "party_id": this.AddWorkerForm.get("StaffList")?.value,
          "project_id": this.projectiD,
          "user_id": this.userId,
          "workforce_ids": this.AddWorkerForm.get("labourstafflist")?.value,
          // "amount": this.AddWorkerForm.get("Salary")?.value
        }

        console.log(body);

        this.courseService.CreateWorkerapi(body).subscribe((response: any) => {
          console.log(response);
          if (response.status === 200) {
            console.log("success");
            this.closeModal();
            this.successName = 'Create Worker';
            this.ngOnInit();
            this.GetAttendanceFun();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          }
        });
      }
    } else {
      this.errorMessage = 'Please fill all the details correctly.';
      this.AddWorkerForm.markAllAsTouched();
    }
  }
  submitted: any;
  errorMessage: any;





  CreateWorkforcefun() {
    if (this.addworkforceform.valid) {
      const body = {
        "worker_type": this.addworkforceform.get("WorkerType")?.value,
        "salary": this.addworkforceform.get("Salary")?.value,
      }
      this.courseService.CreateWorkforceApi(body).subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          console.log("success");
          this.closeModal();
          this.successName = 'Create Workforce';
          this.ngOnInit();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
    } else {
      this.errorMessage = 'Please fill all the details correctly.';
      this.addworkforceform.markAllAsTouched();
    }
  }


  // mark present 
  MarkPresent: boolean = false;
  Markabsent: boolean = false;
  OpenMarkpresent(partyId: any, type: any) {
    this.MarkPresent = true;
    this.attendancetype = type;
    if (type == 0) {
      this.currentpartyId = partyId;
    }
    else {
      this.currentworkforceId = partyId;
    }
  }


  OpenMarkAbsent(partyId: any, type: any) {
    this.Markabsent = true;
    this.attendancetype = type;
    if (type == 0) {
      this.currentpartyId = partyId;
    }
    else {
      this.currentworkforceId = partyId;
    }
  }

  currentpartyId: any;
  currentworkforceId: any;
  attendancetype: any;






  MarkAttendancepresentFun() {
    const caledardateValue = this.CalendarForm.get('Caledardate')?.value;
    const formattedDate = caledardateValue ? new Date(caledardateValue).toISOString().split('T')[0] : '';
    var body
    if (this.attendancetype == 0) {
      body = {
        "project_id": this.projectiD,
        "user_id": this.userId,
        "party_id": this.currentpartyId,
        // "workforce_id":this.userId,
        "date": formattedDate,
        "mark_attendance": [
          {
            "absent": false, // true or false
            "present": true //  true or false
          }
        ]
      }
    }
    else if (this.attendancetype == 1) {
      body = {
        "project_id": this.projectiD,
        "user_id": this.userId,
        "party_id": this.currentpartyId,
        "workforce_id": this.currentworkforceId,
        "date": formattedDate,
        "mark_attendance": [
          {
            "absent": false, // true or false
            "present": true //  true or false
          }
        ]
      }
    }
    console.log(body);
    this.courseService.MarkAttendacneapi(body).subscribe((response: any) => {
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        this.closeModal();
        this.successName = 'Mark Present';
        this.ngOnInit();
        this.GetAttendanceFun();
        setTimeout(() => {
          this.openSecondsuccess = true;
          setTimeout(() => {
            this.openSecondsuccess = false;
          }, 1800);
        }, 200);
      }
      else {
        this.errorMessage = 'Please fill all the details correctly.';
        this.addworkforceform.markAllAsTouched();
      }
    });

  }



  MarkAttendanceabsentFun() {
    const caledardateValue = this.CalendarForm.get('Caledardate')?.value;
    const formattedDate = caledardateValue ? new Date(caledardateValue).toISOString().split('T')[0] : '';
    var body
    if (this.attendancetype == 0) {
      body = {
        "project_id": this.projectiD,
        "user_id": this.userId,
        "party_id": this.currentpartyId,
        // "workforce_id":this.userId,
        "date": formattedDate,
        "mark_attendance": [
          {
            "absent": true, // true or false
            "present": false //  true or false
          }
        ]
      }
    }
    else if (this.attendancetype == 1) {
      body = {
        "project_id": this.projectiD,
        "user_id": this.userId,
        "party_id": this.currentpartyId,
        "workforce_id": this.currentworkforceId,
        "date": formattedDate,
        "mark_attendance": [
          {
            "absent": true, // true or false
            "present": false //  true or false
          }
        ]
      }
    }
    console.log(body);
    this.courseService.MarkAttendacneapi(body).subscribe((response: any) => {
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        this.closeModal();
        this.successName = 'Mark Absent';
        this.ngOnInit();
        this.GetAttendanceFun();
        setTimeout(() => {
          this.openSecondsuccess = true;
          setTimeout(() => {
            this.openSecondsuccess = false;
          }, 1800);
        }, 200);
      }
      else {
        this.errorMessage = 'Please fill all the details correctly.';
        this.addworkforceform.markAllAsTouched();
      }
    });

  }








  OpenUpdatelabourcontract(partyId: any) {
    this.UpdateLabourContractor = true;
    this.currentworkforceId = partyId;
    this.UpdatelabourForm = this.formBuilder.group({
      SalaryAmount: ["", [Validators.required,]],
      shift: ["", [Validators.required,]],
      amount: [0, Validators.required],
      numberOfWorkers: [, Validators.required],
      Overtime: [true],
      Hours: [],
      Rate: [],
      totalovertimeamount: [],
      Notes: [""],
      attendanceimage: [""],
      allowances: this.formBuilder.array([])

    });
    this.addAllowance();

    this.getUpdateattendanceFun();


  }


  Updatelist: any;
  getUpdateattendanceFun() {
    this.courseService.getUpdateattendanceApi(this.projectiD, this.userId, this.currentpartyId, this.currentworkforceId, this.todayDate).subscribe((response: any) => {
      if (response.status === 200) {
        this.Updatelist = response.data;
        this.fillformdate(response.data);

      }
      console.log(this.Updatelist);
    });
  }



  fillformdate(response: any,) {

    var allowancelist = JSON.parse(response.allowance);
    console.log(allowancelist)
    console.log(response.shifts.id)
    this.UpdatelabourForm = this.formBuilder.group({
      SalaryAmount: [response.workforce_salary, [Validators.required,]],
      shift: [response.shifts.id, [Validators.required,]],
      numberOfWorkers: [response.no_of_workers, Validators.required],
      // shift: [null, Validators.required],
      Overtime: [response.over_time != undefined ? response.over_time.toString().length > 0 ? (response.over_time.over_time == 1 ||response.over_time.over_time == true) ? true : false : true : true],
      Hours: [response.over_time != undefined ? response.over_time.toString().length > 0 ? response.over_time.hours : "" : ""],
      Rate: [response.over_time != undefined ? response.over_time.toString().length > 0 ? response.over_time.rate : "" : ""],
      totalovertimeamount: [response.over_time != undefined ? response.over_time.toString().length > 0 ? response.over_time.amount : "" : ""],
      Notes: [response.notes],
      attendanceimage: [""],

      allowances: this.formBuilder.array([])

    });
    this.shiftname=response.shifts.name
    if (response.over_time != undefined) {
      if (response.over_time.toString().length > 0) {
        this.OverTime = true;

      }
    }

    if (allowancelist.length > 0) {
      this.onAttendanceChange(allowancelist)

    } else {
      this.addAllowance();

    }

  }

  onAttendanceChange(allowancelist: any) {
    this.allowances.clear(); // Clear existing FormArray controls
    allowancelist.forEach((e: any) => {
      this.allowances.push(this.createMaterialGroup(e.allowance, e.description, e.amount));
    });
  }



  Shiftlist: any;
  getShiftfun() {
    this.courseService.getShiftApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.Shiftlist = response.shifts;
      }
    });
  }
  shiftname: any;
  shiftchange() {
   
    var newlist = this.Shiftlist.filter((courseType: any) => courseType.id ==  this.UpdatelabourForm.get('shift')?.value);
    console.log(newlist);
    if (newlist.length > 0) {
      this.shiftname = newlist[0].name;

    }
  }


  UpdateLabourContratorfun() {
    if (this.UpdatelabourForm.valid) {
      const formData: FormData = new FormData();
      // Append common fields
      formData.append('project_id', this.projectiD.toString());
      formData.append('user_id', this.userId.toString());
      formData.append('party_id', this.currentpartyId.toString());
      formData.append('workforce_id', this.currentworkforceId.toString());
      formData.append('date', this.todayDate.toString());
      formData.append('no_of_worker', this.UpdatelabourForm.get('numberOfWorkers')?.value.toString());
      formData.append('shift_id', this.UpdatelabourForm.get('shift')?.value.toString());
      formData.append('workforce_salary', this.UpdatelabourForm.get('SalaryAmount')?.value.toString());
      formData.append('notes', this.UpdatelabourForm.get('Notes')?.value.toString());


      const netAmount = this.calculate();
      formData.append('net_amount', netAmount.toString());
      // Append over_time object fields
      //  formData.append('over_time[over_time]', this.UpdatelabourForm.get('Overtime')?.value.toString()); // Assuming it's always true
      // formData.append('over_time[late_fine]', this.UpdatelabourForm.get('Overtime')?.value.toString()); // Assuming it's always false
      // formData.append('over_time[amount]', this.UpdatelabourForm.get('totalovertimeamount')?.value.toString()); // Fixed amount
      // formData.append('over_time[hours]', this.UpdatelabourForm.get('Hours')?.value.toString()); // Fixed hours
      // formData.append('over_time[rate]', this.UpdatelabourForm.get('Rate')?.value.toString()); // Fixed rate

      var ov = {

        "over_time": this.UpdatelabourForm.get('Overtime')?.value == true ? true : false,
        "late_fine": this.UpdatelabourForm.get('Overtime')?.value == false ? true : false,
        "amount": this.UpdatelabourForm.get('totalovertimeamount')?.value.toString(),
        "hours": this.UpdatelabourForm.get('Hours')?.value.toString(),
        "rate": this.UpdatelabourForm.get('Rate')?.value.toString()


      };
      formData.append('over_time', JSON.stringify(ov)); // Assuming it's always true

      // Append each allowance object in the array
      var newMateria = [];
      const allowancesArray = this.UpdatelabourForm.get('allowances') as FormArray;
      for (let i = 0; i < allowancesArray.length; i++) {
        const allowanceGroup = allowancesArray.at(i);
        newMateria.push({
          "allowance": allowanceGroup.get('allowance')?.value == true ? true : false,
          "deduction": allowanceGroup.get('allowance')?.value == false ? true : false,
          "description": allowanceGroup.get('description')?.value,
          "amount": allowanceGroup.get('amount')?.value
        })
      }
      formData.append(`allowance`, JSON.stringify(newMateria));

      // Now you can send formData via an HTTP request




      if (this.profileimage) {
        // If image exists, add it to FormData


        const file = this.profileimage;
        formData.append("image", file, file.name);
      }



      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      // console.log(body);
      this.courseService.UpdateLabourContratorAPI(formData).subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          console.log("success");
          this.closeModal();
          this.successName = 'Update Attendance';
          this.ngOnInit();
          this.getUpdateattendanceFun();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
    } else {
      this.errorMessage = 'Please fill all the details correctly.';
      this.UpdatelabourForm.markAllAsTouched();
    }
  }


  get allowances(): FormArray {
    return this.UpdatelabourForm.get('allowances') as FormArray;
  }

  OverTime = false;


  addOverTime(): void {
    this.UpdatelabourForm.get("Overtime")?.clearValidators();
    this.UpdatelabourForm.get("Hours")?.clearValidators();
    this.UpdatelabourForm.get("Rate")?.clearValidators();
    this.UpdatelabourForm.get("totalovertimeamount")?.clearValidators();
    this.OverTime = !this.OverTime;

    if (this.OverTime == true) {
      this.UpdatelabourForm.get("Overtime")?.setValidators([Validators.required]);
      this.UpdatelabourForm.get("Hours")?.setValidators([Validators.required]);
      this.UpdatelabourForm.get("Rate")?.setValidators([Validators.required]);

    } else {
      // Remove validators
      this.UpdatelabourForm.get("Overtime")?.setValidators([Validators.required]);
      this.UpdatelabourForm.get("Hours")?.setValidators([Validators.required]);
      this.UpdatelabourForm.get("Rate")?.setValidators([Validators.required]);
    }
    this.UpdatelabourForm.get("Overtime")?.updateValueAndValidity();
    this.UpdatelabourForm.get("Hours")?.updateValueAndValidity();
    this.UpdatelabourForm.get("Rate")?.updateValueAndValidity();


  }

  createMaterialGroup(allowance: any, description: any, amount: any): FormGroup {
    return this.formBuilder.group({

      allowance: [allowance],
      description: [description],
      amount: [amount, Validators.required]
    });
  }


  addAllowance(): void {
    if (this.allowances.valid) {
      this.allowances.push(this.formBuilder.group({
        allowance: [true],
        description: [''],
        amount: ["", Validators.required]
      }));
    }
    else {
      this.allowances.markAllAsTouched();
    }

  }

  removeAllowance(index: number): void {
    this.allowances.removeAt(index);
  }

  calculateText() {
    const netAmount = this.calculate();
    const amount = this.UpdatelabourForm.get('SalaryAmount')?.value || 0;
    const numberOfWorkers = this.UpdatelabourForm.get('numberOfWorkers')?.value || 0;
    const shift = this.shiftname||1.0;
    const overtime = {
      over_time: this.UpdatelabourForm.get('Overtime')?.value,
      amount: this.calculateOvertimeAmount() || 0,
    };

    let totalText = `Net Amount = ${netAmount} (${amount} * ${numberOfWorkers} * ${shift}) `;

    if (overtime) {
      totalText += overtime.over_time ? `+ ${overtime.amount}` : `- ${overtime.amount}`;
    }

    totalText += this.allowanceText();

    return totalText;
  }

  allowanceText() {
    let text = '';
    const allowancesArray = this.UpdatelabourForm.get('allowances') as FormArray;

    allowancesArray.controls.forEach((allowanceGroup, i) => {
      const allowance = allowanceGroup.get('allowance')?.value;
      const amount = allowanceGroup.get('amount')?.value || 0;

      if (allowance) {
        text += `+ ${amount}`;
      } else {
        text += `- ${amount}`;
      }
    });

    return text;
  }

  calculateAllowance() {
    let totalAllowance = 0;

    const allowancesArray = this.UpdatelabourForm.get('allowances') as FormArray;
    allowancesArray.controls.forEach((allowanceGroup) => {
      const allowance = allowanceGroup.get('allowance')?.value;
      const amount = parseFloat(allowanceGroup.get('amount')?.value || '0');

      if (allowance) {
        totalAllowance += amount;
      } else {
        totalAllowance -= amount;
      }
    });

    return totalAllowance;
  }

  calculate() {
    const amount = parseFloat(this.UpdatelabourForm.get('SalaryAmount')?.value || '0');
    const numberOfWorkers = parseFloat(this.UpdatelabourForm.get('numberOfWorkers')?.value || '0');
    const shift = parseFloat(this.UpdatelabourForm.get('shift')?.value || '0');

    let overtimeAmount = 0;
    let overtime = this.UpdatelabourForm.get('Overtime')?.value;
    if (overtime) {
      overtimeAmount = parseFloat(this.UpdatelabourForm.get('totalovertimeamount')?.value || '0');
    }

    const netAmount = (numberOfWorkers * shift * amount) + overtimeAmount + this.calculateAllowance();
    return netAmount;
  }



  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output() fileSelected = new EventEmitter<File>();
  imageUrl: string | ArrayBuffer | null = null;
  profileimage!: any;
  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    if (file) {
      this.fileSelected.emit(file);
      this.profileimage = file;
      // Preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
      this.profileimage = file;
      // Preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile(event: MouseEvent): void {
    event.stopPropagation();
    this.imageUrl = null;
    this.profileimage = undefined;
    this.fileInput.nativeElement.value = '';
  }

  clearFileWithoutevent(): void {
    this.imageUrl = null;
    this.profileimage = undefined;
    this.fileInput.nativeElement.value = '';
  }



  onDragLeave(event: any): void {
    event.preventDefault();
  }






  check(input: any) {
    if (input.value == 0) {
      input.setCustomValidity('The number must not be zero.');
    } else {
      // input is fine -- reset the error message
      input.setCustomValidity('');
    }
  }






  calculateOvertimeAmount() {
    const hours = this.UpdatelabourForm.get('Hours')?.value || 0;
    const rate = this.UpdatelabourForm.get('Rate')?.value || 0;
    const totalOvertimeAmount = hours * rate;
    this.UpdatelabourForm.get('totalovertimeamount')?.setValue(totalOvertimeAmount);
    return totalOvertimeAmount;
  }
















































}

