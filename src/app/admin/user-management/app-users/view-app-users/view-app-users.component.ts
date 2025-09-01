import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
// import { CourseService } from 'src/app/core/services/course.service';
// import { DataService } from 'src/app/core/services/data.service';
// import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-view-app-users',
  templateUrl: './view-app-users.component.html',
  styleUrl: './view-app-users.component.scss',
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
export class ViewAppUsersComponent {
  CalendarForm!: FormGroup;
  searchbarform!: FormGroup;
  maxDate: Date;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  users: any = null;

  constructor(
    private formBuilder: FormBuilder,
    // private dataService: DataService,
    // private courseService: CourseService,
    private jwtService: JwtService,
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.maxDate = new Date();
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    this.appUserID = router.url.slice(0).split(urlDelimitators)[4];
    console.log(this.appUserID);
  }

  addworkforceform!: FormGroup;
  userId: any;
  appUserID: any;
  ngOnInit(): void {
    // this.projectiD = this.route.snapshot.paramMap.get('id');
    this.userId = this.jwtService.getpanelUserId();
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
    this.approvalForm = this.formBuilder.group({
      action: ['', Validators.required],
    });
    this.GetAppUserfun();

    this.GetPartyType();
    // this.GetAttendanceFun();
    this.appUserData = history.state.userData;
  }
  // userstable = [
  //   {
  //     userid: '10B47',
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     number: '9876543210',
  //   },
  // ];
  appUserData: any;

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
  userstable: any;
  GetAppUserfun() {
    console.log(this.appUserID);
    this.employeeService
      .GetAppUserIdApi(this.appUserID)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.userstable = response.data;
          console.log(this.userstable);
        }
      });
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
  isExpanded: { [key: number]: boolean } = {};
  // Toggle description expand/collapse state
  toggleDescription(eventId: number, event: Event): void {
    event.preventDefault(); // Prevents page reload on anchor click
    this.isExpanded[eventId] = !this.isExpanded[eventId];
  }
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
  // onToggleChange(event: Event, id: string): void {
  //   const input = event.target as HTMLInputElement;
  //   this.Status(id, input.checked ? 'exclusive' : null);
  // }
  // async Status(id: string, tag: any) {
  //   const actionMessage = 'Status Changed';
  //   const currentIndex = this.activeIndex;
  //   this.employeeService
  //     .changeStoreTag(id, tag, this.appUserID)

  //     .subscribe((response: any) => {
  //       console.log(response);
  //       if (response.status === 200 || response.status === 201) {
  //         this.successName = actionMessage;
  //         this.GetAppUserfun();
  //         this.activeIndex = currentIndex;
  //         setTimeout(() => {
  //           this.openSecondsuccess = true;
  //           setTimeout(() => {
  //             this.openSecondsuccess = false;
  //           }, 1800);
  //         }, 200);
  //       }
  //     });
  // }
  async Status(pivotId: string, is_exclusive: number) {
    const actionMessage = 'Status Changed';
    const currentIndex = this.activeIndex;
    this.employeeService
      .changeCompanyTag(pivotId, is_exclusive)
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          this.successName = actionMessage;
          this.GetAppUserfun();
          this.activeIndex = currentIndex;
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
  }
  async StatusEmp(id: string, status: any) {
    const actionMessage = status ? 'activated' : 'deactivated';

    this.employeeService
      .changestatuss(id, status, 'Staff')

      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          this.successName = actionMessage;
          this.ngOnInit();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
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
  activeIndex: number | null = 0;
  // Toggle accordion
  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  showDocumentDeleteDialog = false;
  showEmployeeDeleteDialog = false;
  documentName: any;
  employeeName: any;
  documentListId: any;
  employeeId: any;
  openDocumentDeleteDialog(docId: any, docName: any): void {
    this.documentListId = docId;
    console.log('Document ID:', docId);
    console.log('Document Name:', docName);
    this.documentName = docName;
    this.showDocumentDeleteDialog = true;
  }
  openEmployeeDeleteDialog(empId: any, empName: any): void {
    this.employeeId = empId;
    console.log('Employee ID:', empId);
    console.log('Employee Name:', empName);
    this.employeeName = empName;
    this.showEmployeeDeleteDialog = true;
  }
  documentDelete(docId: any): void {
    this.documentListId = docId;
    // Call the API to update the user profile
    // this.employeeService.userHomeDocumentDelete(this.documentListId).subscribe({
    //   next: (response: any) => {
    //     if (response.status === 200 || response.status === 201) {
    //       this.submitted = true;
    //       this.closeDocumentDialog(); // Add this to close the modal
    //       this.getdDocumentsByID();
    //       this.notificationService.show(response.message, 'success', 3000);
    //     } else {
    //       this.submitted = false;
    //       this.notificationService.show(
    //         'Failed to update the document',
    //         'error',
    //         3000
    //       );
    //     }
    //   },
    //   error: (error: any) => {
    //     this.submitted = false;
    //     this.errorMessage = 'Update failed due to server error';
    //     console.error('Update failed', error);
    //     this.notificationService.show(
    //       'Update failed due to server error',
    //       'error',
    //       3000
    //     );
    //   },
    // });
  }
  employeeDelete(empId: any) {}
  closeDocumentDialog(): void {
    this.showDocumentDeleteDialog = false;
    this.showEmployeeDeleteDialog = false;
  }
  // Open the approval dialog
  shopApproveLicId: any;
  showApproveDialog = false;
  showApproveLicenseDialog = false;
  licenseNo: any;
  approvalForm!: FormGroup;
  openApproveLicenseDialog(shopId: any) {
    this.shopApproveLicId = shopId.id;
    this.licenseNo = shopId.license_number;
    this.showApproveLicenseDialog = true;
    this.errorMessage = '';
    this.approvalForm.reset();
  }

  // Close the approval dialog
  closeApproveLicenseDialog() {
    this.showApproveLicenseDialog = false;
    this.approvalForm.reset();
    this.errorMessage = '';
  }
  submitLicApproval() {
    // Validate shopId and user_id before making API call
    if (this.approvalForm.valid && this.shopApproveLicId) {
      if (!this.userId) {
        this.errorMessage = 'User ID is required. Please log in again.';
        this.submitted = false;
        return;
      }

      const body = {
        license_id: this.shopApproveLicId,
        user_id: this.userId,
        status:
          this.approvalForm.get('action')?.value === 'approve'
            ? 'approved'
            : 'rejected',
      };

      this.submitted = true; // Set submitted to true during API call
      this.errorMessage = ''; // Clear previous error message

      this.employeeService.storeLicenseApproveApi(body).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            this.closeApproveLicenseDialog();
            this.successName = 'Status Upadated';
            this.ngOnInit();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          } else {
            this.submitted = false;
            if (response.status === 422 && response.errors) {
              const errors = response.errors;
              if (
                errors.user_id &&
                Array.isArray(errors.user_id) &&
                errors.user_id.length > 0
              ) {
                this.errorMessage = errors.user_id[0];
              } else {
                const firstErrorField = Object.keys(errors).find(
                  (key) => Array.isArray(errors[key]) && errors[key].length > 0
                );
                this.errorMessage = firstErrorField
                  ? errors[firstErrorField][0]
                  : 'Failed to update status';
              }
            } else if (response.errors || response.message) {
              this.errorMessage = JSON.stringify(
                response.errors || response.message
              );
            } else {
              this.errorMessage = 'Failed to update status';
            }
          }
        },
        error: (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while update status';
        },
      });
    } else {
      this.errorMessage = 'Please select an action (Approve or Reject).';
    }
  }
  getCompanyNames(): string {
    if (!this.userstable?.stores?.length) return 'N/A';

    const companyNames: string[] = [];

    this.userstable.stores.forEach((store: any) => {
      if (store.companies?.length) {
        store.companies.forEach((company: any) => {
          if (company.name) {
            companyNames.push(company.name);
          }
        });
      }
    });

    return companyNames.length ? companyNames.join(', ') : 'N/A';
  }

  getParsedFeatures(): string[] {
    try {
      return this.userstable.user.subscription?.features
        ? JSON.parse(this.userstable.user.subscription.features)
        : [];
    } catch {
      return ['N/A'];
    }
  }
  getAddOns(): string {
    if (!this.userstable.user?.add_ons?.length) {
      return 'None';
    }
    return this.userstable.user.add_ons
      .map(
        (addon: any) =>
          `Type=${addon.name || `Add-on ${addon.id}`}, quantity=${
            addon.quantity
          }, total amount=${addon.total_price}, price=${addon.price}`
      )
      .join('; ');
  }
}
