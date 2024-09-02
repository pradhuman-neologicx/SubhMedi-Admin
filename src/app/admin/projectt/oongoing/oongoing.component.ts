import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';


@Component({
  selector: 'app-oongoing',
  templateUrl: './oongoing.component.html',
  styleUrl: './oongoing.component.scss',
  
  animations: [
    trigger('slideInOut', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)')
      ])
    ]),
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


export class OongoingComponent {
  FilterForm!: FormGroup;

  showreset: any = false
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  CreateliveexamForm!: FormGroup;
  createproductform!: FormGroup;

  orderviewform!: FormGroup;

  projectgopen: boolean = false;
  addeventOpen: boolean = false;
  deleteeventOpen: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
  ) { }


  ngOnInit(): void {

    this.FilterForm = this.formBuilder.group({
      filter: ['', [Validators.required]],
    });


    this.Bulkuploadform = this.formBuilder.group({
      UploadFile: ["", [
        Validators.required,
      ],],
    });
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });
    this.createproductform = this.formBuilder.group({
      projectname: ["", [Validators.required,]],
      Address: ["", [Validators.required,]],
      State: ["", [Validators.required,]],
      City: ["", [Validators.required,]],
      SelectClient: ["", [Validators.required,]],
      Selectstaff: ["", [Validators.required,]],
      description: ["", [Validators.required,]],
    });
    
    this.getOngoingproject(0);
    this.getState();








  }



  stateList: any = [];
  getState() {
    this.employeeService.GetState().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.stateList = response.data;
      }
    });
  }
  citylist: any = [];
  StateCode: any = [];
  StateName: any = [];

  // GetCityByState(value: any) {
  //   console.log(value);
  //   if (value != undefined && value.length > 0) {
  //     let [code, name] = value.split('-');
  //     this.StateCode = code.trim();
  //     this.StateName = name.trim();
  //     console.log("Code:", code.trim());  // Output: Code: AN
  //     console.log("Name:", name.trim());
  //   }
  //   if (this.StateCode != undefined && this.StateCode.length > 0) {
  //     this.getCityByStateCode(this.StateCode);
  //   }
  // }

 


  // getCityByStateCode(StateCode: any) {
  //   this.employeeService.GetCities("IN", StateCode).subscribe((response: any) => {
  //     if (response.statusCode === 200) {
  //       console.log(response.cities);

  //       // Filter cities based on state code
  //       this.citylist = response.data;

  //       console.log(this.citylist);
  //     }
  //   });
  // }










  productTable: any
  getOngoingproject(type: any) {
    if (type == 0) {
      //init or without search
      this.employeeService
        .getOngoingProject(this.FilterForm.get('filter')?.value ?? "")
        .subscribe((response: any) => {
          this.productTable = response.ongoing_projects;

        });
    } else {
      //with search
      if (this.FilterForm.valid) {
        this.employeeService
          .getOngoingProject(this.FilterForm.get('filter')?.value)
          .subscribe((response: any) => {
            this.productTable = response.ongoing_projects;

          });
      } else {
        this.FilterForm.markAllAsTouched();
      }

    }

  }








  table_heading = [
    {
      heading0: "Serial No.",
      heading1: "Project Name",
      heading2: "In",
      heading3: "Out",
      heading4: "Description",
      heading5: "Action",
    },
  ];



  searchfun() { }
  resetsearchbar() { }
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
  onTableDataChange(event: any) {
    this.page = event;
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
  closeModal() {
    this.projectgopen = false;
  
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
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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
    const uploadInput = document.getElementById('uploadInput') as HTMLInputElement;
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
      console.log("Please select a file before proceeding.");
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
  downloadcourseFile() { }

  // BulkuploadCourseFun() {
  //   if (this.Bulkuploadform.valid) {
  //     const formData: FormData = new FormData();
  //     if (this.selectedfile != undefined) {
  //       const file = this.selectedfile;
  //       formData.append("xlsx", file, file.name);
  //       console.log(formData);

  //       this.employeeService.BulkuploadCourseapi(formData).subscribe((response: any) => {
  //         this.errorMessage = response.errorMessage;
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



}
