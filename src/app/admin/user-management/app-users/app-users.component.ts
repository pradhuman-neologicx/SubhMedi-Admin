import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { units } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.scss',

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
export class AppUsersComponent {
  FilterForm!: FormGroup;

  showreset: any = false;
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  CreateliveexamForm!: FormGroup;
  unitsformscreate!: FormGroup;

  orderviewform!: FormGroup;

  projectgopen: boolean = false;
  addeventOpen: boolean = false;
  deleteeventOpen: boolean = false;

  projectiD: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
  }

  user_id: any;
  ngOnInit(): void {
    this.idString = this.route.snapshot.paramMap.get('id');
    console.log(this.projectiD);
    this.user_id = this.jwtService.getpanelUserId();
    this.FilterForm = this.formBuilder.group({
      filter: ['', [Validators.required]],
    });

    this.Bulkuploadform = this.formBuilder.group({
      UploadFile: ['', [Validators.required]],
    });
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.unitsformscreate = this.formBuilder.group({
      usernname: ['', [Validators.required]],
      usernrole: ['', [Validators.required]],
      usernemail: ['', [Validators.required, Validators.email]],
      usernnumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });

    this.unitsformscreate = this.formBuilder.group({
      usernname: ['', [Validators.required]],
      usernrole: ['', [Validators.required]],
      usernemail: ['', [Validators.required]],
      usernnumber: ['', [Validators.required]],
    });
    this.userformview = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
      isActive: [{ value: '', disabled: true }],
      createdAt: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
    });
    this.Getuserfun();
  }

  userstable: any;
  idString: any;
  id: any;

  submitted: any;
  errorMessage: any;
  successName: any = '';
  openSecondsuccess: boolean = false;

  Creatunitopen: boolean = false;
  updateusersopen: boolean = false;
  OpenCreateModal() {
    this.Creatunitopen = true;
  }
  closeModal() {
    this.Creatunitopen = false;
    this.updateusersopen = false;
    this.viewunitopen = false;
  }
  navigateToViewUsers(user: any) {
    this.router.navigate(['/admin/user-management/view-users'], {
      state: { userData: user },
    });
  }

  viewmmodal(id: any) {
    // Log the project_id to the console

    console.log('id ID:', id);

    // Navigate to the desired route with the project_id
    this.router.navigate(['/admin/user-management/view-users', id], {
      // queryParams: { exam_type: exam_type },
      // queryParams: { action: 'startNow' }
    });
  }

  search: any;
  userType: any;
  Getuserfun() {
    this.userType = 'free_user';
    this.employeeService
      .GetUserApi(
        this.user_id,
        this.tableSize,
        this.page,
        this.search,
        this.userType
      )
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.userstable = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
  }

  createunits() {
    console.log(this.unitsformscreate.get('usernname')?.value);

    if (this.unitsformscreate.valid) {
      this.units.name = this.unitsformscreate.get('usernname')?.value;

      const body = JSON.stringify(this.units);
      console.log(body);
      this.employeeService.createunits(body).subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.closeModal();
          // this.successName = 'Batch';
          // this.ngOnInit();
          // this.Getunitsfun();
          // this.dataService.changeMessage({ message: "units Created" });
          // this.router.navigate(['/master/units']);
          setTimeout(() => {
            // this.openSecondsuccess = true;
            setTimeout(() => {
              // this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        } else {
          // this.submitted = false;
        }
      });
    }
  }
  async Status(id: string, status: any) {
    const actionMessage = status ? 'activated' : 'deactivated';

    this.employeeService
      .changestatuss(id, status, 'Staff')

      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          this.successName = actionMessage;
          this.Getuserfun();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
  }
  updateunits() {
    console.log(this.usersformupdate.get('usernname')?.value);

    // if (this.usersformupdate.valid) {
    //   this.units.name = this.usersformupdate.get('usernname')?.value;
    //   this.units.email = this.usersformupdate.get('usernemail')?.value;
    //   this.units.number = this.usersformupdate.get('usernnumber')?.value;
    //   this.units.unit_id = this.unit_id;

    //   const body = JSON.stringify(this.units);
    //   console.log(body);
    //   this.employeeService.updateunits(body).subscribe((response: any) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       this.closeModal();
    //       // this.successName = 'Batch';
    //       // this.ngOnInit();
    //       // this.Getunitsfun();
    //       // this.dataService.changeMessage({ message: "units Created" });
    //       // this.router.navigate(['/master/units']);
    //       setTimeout(() => {
    //         // this.openSecondsuccess = true;
    //         setTimeout(() => {
    //           // this.openSecondsuccess = false;
    //         }, 1800);
    //       }, 200);
    //     } else {
    //       // this.submitted = false;
    //     }
    //   });
    // }
  }

  units: units = new units();

  unit_id: any;

  usersformupdate!: FormGroup;
  OpenEditModal(units: any): void {
    this.unit_id = units.id;

    try {
      if (!units || !units.id) {
        console.error('unit ID is undefined or null.');
        return;
      }

      this.updateusersopen = true;
      this.usersformupdate = this.formBuilder.group({
        usernname: [units.name, [Validators.required]],
        usernrole: [units.role, [Validators.required]],
        usernemail: [units.email, [Validators.required]],
        usernnumber: [units.number, [Validators.required]],
      });
    } catch (error) {
      console.error('An error occurred while opening edit modal:', error);
    }
  }

  projectpartiestable: any;
  totalToPay: number = 0;
  totalAdvancePaid: number = 0;

  getpartyproject(type: any) {
    const searchValue = this.FilterForm.get('filter')?.value ?? '';

    if (type == 0) {
      // Init or without search
      this.employeeService
        .getProjectParties(this.projectiD, searchValue)
        .subscribe((response: any) => {
          this.totalToPay = response.total_to_pay || 0;
          this.totalAdvancePaid = response.total_advance_paid || 0;
          this.projectpartiestable = response.parties;
        });
    } else {
      // With search
      if (this.FilterForm.valid) {
        this.employeeService
          .getProjectParties(this.projectiD, searchValue)
          .subscribe((response: any) => {
            this.totalToPay = response.total_to_pay || 0;
            this.totalAdvancePaid = response.total_advance_paid || 0;
            this.projectpartiestable = response.parties;
          });
      } else {
        this.FilterForm.markAllAsTouched();
      }
    }
  }

  table_heading = [
    {
      heading0: 'Serial No.',
      heading1: 'Project Name',
      heading2: 'Project Type',
      heading3: 'Amount',
      heading4: 'Status',
      heading5: 'Action',
    },
  ];

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.search = this.searchbarform.get('searchbar')?.value;
      this.Getuserfun();
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }
  resetsearchbar() {
    window.location.reload();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    console.log(event.target.value);
    this.page = 1;
    this.Getuserfun();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.Getuserfun();
  }

  addeventmmodal() {
    this.addeventOpen = true;
  }
  deleteeventmmodal() {
    this.deleteeventOpen = true;
  }
  projectcreatemodal() {
    this.projectgopen = true;
  }

  ClickModalconent(event: Event): void {
    event.stopPropagation();
  }
  ClickexamupdateModalconent(event: Event): void {
    event.stopPropagation();
  }
  onCheckboxChange(event: any, rowData: any) {
    if (event.target.checked) {
      // Handle selection
      console.log('Row selected:', rowData);
    } else {
      // Handle deselection
      console.log('Row deselected:', rowData);
    }
  }

  showStudent: any;
  // getfeesmanagementByFilter(name: any) {
  //   // Check if the form is valid
  //   if (this.FilterForm.valid) {
  //     // Log the search term
  //     console.log(name);

  //     // Check if the search term is not undefined and has a length greater than 0
  //     if (name !== undefined && name.toString().length > 0) {
  //       this.showStudent = true; // Show student-related UI elements if needed

  //       // Prepare the body for the API request
  //       const body = {
  //         sessionId: this.sessionId, // Ensure sessionId is defined correctly in your component
  //       };

  //       // Call the service to get filtered data
  //       this.feesManagementService
  //         .getfeesStudentmanagementByFilter(
  //           body,
  //           undefined,
  //           name,
  //           undefined,
  //           undefined,
  //           undefined
  //         )
  //         .subscribe(
  //           (response: any) => {
  //             // Set the data for the table
  //             this.productTable = response.data || [];

  //             // Optional: Handle empty state or any additional UI updates
  //             if (!response.data || response.data.length === 0) {
  //               console.log('No data available');
  //               // You can display a message or handle the empty state here
  //             }
  //           },
  //           (error) => {
  //             console.error('Error fetching filtered data:', error);
  //             // Optionally, handle errors like showing a message to the user
  //             this.productTable = []; // Clear the table data on error
  //           }
  //         );
  //     } else {
  //       // Reset the table when the input is empty
  //       this.productTable = [];
  //     }
  //   } else {
  //     // Mark all form controls as touched to show validation errors
  //     this.FilterForm.markAllAsTouched();
  //   }
  // }

  resetFilter() {
    window.location.reload();
  }

  Bulkuploadform!: FormGroup;
  Excel: boolean = false;

  OpenExcel() {
    this.Excel = true;
  }

  selectedFileName: string | null = null;
  selectedfile: any;
  openFileUpload() {
    const uploadInput = document.getElementById('uploadInput');
    if (uploadInput) {
      uploadInput.click();
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.selectedFileName = file.name;
        this.selectedfile = file;
      } else {
        console.error('Only Excel files are allowed.');
      }
    }
  }

  removeFile() {
    this.selectedFileName = null;
    this.selectedfile = undefined;
    const uploadInput = document.getElementById(
      'uploadInput'
    ) as HTMLInputElement;
    if (uploadInput) {
      uploadInput.value = '';
    }
  }

  BulkUploadExcel: boolean = false;
  UploadSampleFile() {
    if (this.selectedFileName) {
      this.Excel = false;
      this.BulkUploadExcel = true;
    } else {
      console.log('Please select a file before proceeding.');
    }
  }

  // downloadcourseFile(): void {
  //   const url = `${environment.coursefile_url}download/course`;
  //   this.httpClient.get(url, { responseType: 'blob' })
  //     .subscribe(
  //       (blob: Blob) => {
  //         const fileName = 'synthesis_courses.xlsx'; // Specify the file name
  //         saveAs(blob,fileName);
  //       },
  //       (error: any) => {
  //         console.error('Failed to download the file.', error);
  //         // Handle error as needed
  //       }
  //     );
  // }
  downloadcourseFile() {}

  // BulkuploadCourseFun() {
  //   if (this.Bulkuploadform.valid) {
  //     const formData: FormData = new FormData();
  //     if (this.selectedfile != undefined) {
  //       const file = this.selectedfile;
  //       formData.append("xlsx", file, file.name);
  //       console.log(formData);

  //       this.employeeService.BulkuploadCourseapi(formData).subscribe((response: any) => {
  //         this.errorMessage = ;
  //         if (response.statusCode === 200 || response.statusCode === 201) {
  //           console.log(response);
  //           this.closeModal();
  //           this.successName = 'Upload Bulk';
  //           this.openSecondsuccess = true;
  //           this.removeFile();
  //           this.ngOnInit();
  //           this.getNewCourses();
  //           setTimeout(() => {
  //             this.openSecondsuccess = true;
  //             setTimeout(() => {
  //               this.openSecondsuccess = false;
  //             }, 1800);
  //           }, 200);

  //         } else {
  //           this.submitted = false;
  //         }
  //       });
  //     }
  //     else {
  //       console.log("Please Select file");
  //       // Handle the case where no file is selected or form is invalid
  //     }

  //   }
  //   else {
  //     this.Bulkuploadform.markAllAsTouched();
  //   }
  // }
  showDeleteModal = false;
  deleteError = '';
  UserIID: any;

  openDeleteModal(userId: any) {
    console.log('delee clicked');
    this.UserIID = userId;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteError = '';
  }

  confirmDelete() {
    // this.deleteService.deleteItem(this.itemId).subscribe({
    //   next: () => {
    //     this.closeDeleteModal();
    //     // Optionally refresh data or notify success
    //   },
    //   error: (err) => {
    //     this.deleteError = 'Failed to delete. Please try again.';
    //   },
    // });
  }
  viewunitopen: boolean = false;
  userformview!: FormGroup;
  currrentClubId: any;
  generalUserID: any;
  openviewModal(users: any): void {
    this.generalUserID = users.id;

    try {
      if (!users || !users.id) {
        console.error('unit ID is undefined or null.');
        return;
      }
      this.viewunitopen = true;
      this.userformview.patchValue({
        name: users.name || 'N/A',
        email: users.email || 'N/A',
        mobile: users.mobile || 'N/A',
        isActive: users.is_active === 1 ? 'Active' : 'Inactive',
        role: users.role || 'N/A',
      });
    } catch (error) {
      console.error('An error occurred while opening edit modal:', error);
    }
  }
}
