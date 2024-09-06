import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  userId: any;
  projectiD: any;
  ngOnInit(): void {
    // this.projectiD = this.route.snapshot.paramMap.get('id');
    this.userId = this.jwtService.getpanelUserId();
    this.CalendarForm = this.formBuilder.group({
      Caledardate: [this.maxDate,
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
      labourstafflist:[],
    });

    this.addworkforceform = this.formBuilder.group({
      WorkerType: ["", [Validators.required,]],
      Salary: ["", [Validators.required,]]
    });

    // this.GetStaffFun();






    this.GetPartyType();
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


    const caledardateValue = this.CalendarForm.get('Caledardate')?.value;
    const formattedDate = caledardateValue ? new Date(caledardateValue).toISOString().split('T')[0] : '';

    this.courseService.getAttendacneAPI(this.projectiD, this.userId, formattedDate).subscribe((response: any) => {
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

  OpenViewDetails(): void {
    this.ViewDetailopen = true;
  }

  closeModal() {
    this.ViewDetailopen = false;
    this.addworkeropen = false;
    this.addworkforceopen = false;
  }



  addworkeropen: boolean = false;

  addworkforceopen: boolean = false;


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
    else if (value == "labour contractor" ){
    
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
  GetStaffFun(type:any) {
    this.courseService.GetStaffApi(this.projectiD,type).subscribe((response: any) => {
      console.log(this.projectiD);
      if (response.status === 200) {
        this.Stafflist = response.parties;
      }
       
    });
  }


  labourcontractorstaff(id:any){
    if (this.partyTypeName === 'labour contractor') {
this.GetStafflabourcontractorfun(id);
    }
  }

  labourstafflist:any;
  GetStafflabourcontractorfun(type:any) {
    this.courseService.GetStafflabourcontractorapi(type,this.projectiD).subscribe((response: any) => {
      console.log(this.projectiD);
      if (response.status === 200) {
        this.labourstafflist= response.workforces;
      }
    });
  }








  successName: any = "";
  openSecondsuccess = false;
  CreateWorkerfun() {
    if (this.AddWorkerForm.valid) {
      if (this.partyTypeName  == 'staff' || this.partyTypeName  == 'labour' ) {


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

      else if (this.partyTypeName  == 'labour contractor' ) {


        const body = {
          "party_id": this.AddWorkerForm.get("StaffList")?.value,
          "project_id": this.projectiD,
          "user_id": this.userId,
          "workforce_ids":this.AddWorkerForm.get("labourstafflist")?.value,
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

}

