import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { CourseService } from 'src/app/core/services/course.service';
// import { DataService } from 'src/app/core/services/data.service';
// import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-view-silent-users',
  templateUrl: './view-silent-users.component.html',
  styleUrl: './view-silent-users.component.scss',
  animations: [
    trigger('succesfullyMesaage', [
      state(
        'void',
        style({
          transform: 'translateX(-30%)',
          opacity: 0,
        })
      ),
      transition(':enter, :leave', [
        animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)'),
      ]),
    ]),
    trigger('slideIn', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            transform: 'translateX(0)', // Final position for slide-in effect
            opacity: 1, // Final opacity
          })
        ),
      ]),
    ]),

    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.5)', // Start with smaller size
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)', // Final size
          })
        ),
      ]),
    ]),
  ],
})
export class ViewSilentUsersComponent {
  CalendarForm!: FormGroup;
  searchbarform!: FormGroup;
  maxDate: Date;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  constructor(
    private formBuilder: FormBuilder,
    // private dataService: DataService,
    // private courseService: CourseService,
    // private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.maxDate = new Date();
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
  }

  addworkforceform!: FormGroup;
  userId: any;
  projectiD: any;
  ngOnInit(): void {
    // this.projectiD = this.route.snapshot.paramMap.get('id');
    // this.userId = this.jwtService.getpanelUserId();
    this.CalendarForm = this.formBuilder.group({
      Caledardate: [this.maxDate, [Validators.required]],
    });
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });

    this.addworkforceform = this.formBuilder.group({
      WorkerType: ['', [Validators.required]],
      Salary: ['', [Validators.required]],
    });

    // this.GetStaffFun();

    this.GetPartyType();
    // this.GetAttendanceFun();
    this.silentUserData = history.state.userData;
  }
  silentUserData: any;
  documents = [
    {
      id: 1,
      name: 'Insurance Certificate',
      code: 'qwqw',
      startDate: '07 Sep 2024',
      endDate: '09 Sep 2024',
      owner: 'shivangi',
      status: 'Active',
      docUrl: 'https://blb.mobilogicx.com/admin/vehicle-documents-show/5',
    },
    {
      id: 2,
      name: 'Pollution Under Control Certificate',
      code: '3434',
      startDate: '08 Sep 2024',
      endDate: '10 Sep 2024',
      owner: 'shivangi',
      status: 'Expired',
      docUrl: 'https://blb.mobilogicx.com/admin/vehicle-documents-show/6',
    },
  ];
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    console.log(event.target.value);
    this.page = 1;
    // if (this.searchbarform.valid && this.showreset==true) {
    //   this.searchfun()
    // }else{
    //   this.getstudentsfunpagination(this.type);
    // }
  }
  searchfun() {
    this.showreset = true;
  }

  resetsearchbar() {}

  showreset: any = false;
  totalPresent: any;
  totalAbsent: number = 0;
  totalNetAmount: number = 0;
  workertable: any;
  Attendancetable: any;
  // projectiD: any;

  ViewDetailopen: boolean = false;

  OpenViewDetails(): void {
    this.ViewDetailopen = true;
  }

  closeModal() {
    this.ViewDetailopen = false;
    this.addworkeropen = false;
  }

  addworkeropen: boolean = false;

  AddopenWorker(): void {
    this.addworkeropen = true;
  }
  PartTypeList: any;

  GetPartyType() {
    // this.courseService.GetpartyTypetableApi().subscribe((response: any) => {
    //   if (response.status === 200) {
    //     this.PartTypeList = response.party_types;
    //     this.filteredPartyTypes = this.filterPartyTypes(this.PartTypeList);
    //     // Check if 'staff' is present in the filteredPartyTypes
    //     if (this.filteredPartyTypes.some((type: any) => type.name.toLowerCase() === 'staff')) {
    //     }
    //   }
    //   console.log(this.PartTypeList);
    // });
  }

  filteredPartyTypes: any;
  filterPartyTypes(partyTypes: any[]): any[] {
    // Define the types you want to filter
    const typesToInclude = ['staff', 'labour', 'labour contractor'];
    return partyTypes.filter((type) =>
      typesToInclude.includes(type.name.toLowerCase())
    );
  }

  partyTypeName: any;
  partyTypeNameupdate: any;
  staffselect(value: any) {
    var newlist = this.PartTypeList.filter(
      (courseType: any) => courseType.id == value
    );
    console.log(newlist);
    if (newlist.length > 0) {
      this.partyTypeName = newlist[0].name;
      if (this.partyTypeName == 'staff') {
        this.GetStaffFun();
        // this.updateEmailValidators();
      }
    }
  }

  updateEmailValidators() {
    if (this.partyTypeName === 'staff') {
      this.addworkforceform
        .get('StaffList')
        ?.setValidators([Validators.required]);
    } else {
      this.addworkforceform.get('StaffList')?.clearValidators();
    }

    this.addworkforceform.get('StaffList')?.updateValueAndValidity();
  }

  // Typestafflist
  Stafflist: any;
  GetStaffFun() {
    // this.courseService.GetStaffApi(this.projectiD, this.partyTypeName).subscribe((response: any) => {
    //   console.log(this.projectiD);
    //   if (response.status === 200) {
    //     this.Stafflist = response.parties;
    //   }
    // });
  }
  successName: any = '';
  openSecondsuccess = false;
  CreateWorkforcefun() {
    if (this.addworkforceform.valid) {
      const body = {
        worker_type: this.addworkforceform.get('WorkerType')?.value,
        salary: this.addworkforceform.get('Salary')?.value,
      };
      // this.courseService.CreateWorkforceApi(body).subscribe((response: any) => {
      //   console.log(response);
      //   if (response.status === 200) {
      //     console.log("success");
      //     this.closeModal();
      //     this.successName = 'Create Workforce';
      //     this.ngOnInit();
      //     setTimeout(() => {
      //       this.openSecondsuccess = true;
      //       setTimeout(() => {
      //         this.openSecondsuccess = false;
      //       }, 1800);
      //     }, 200);
      //   }
      // });
    } else {
      this.errorMessage = 'Please fill all the details correctly.';
      this.addworkforceform.markAllAsTouched();
    }
  }
  submitted: any;
  errorMessage: any;
}
