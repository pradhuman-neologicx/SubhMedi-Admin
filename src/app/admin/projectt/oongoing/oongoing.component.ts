import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';


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
    private jwtService: JwtService
  ) { }


  ngOnInit(): void {
    this.user_id= this.jwtService.getpanelUserId();
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
      Address: [""],
      State: [""],
      City: [""],
      SelectClient: ["", [Validators.required,]],
      Selectstaff: [""],
      description: [""],
      StartDate: [""],
      endDate: [""],
    });
    
    this.getOngoingproject(0);
    this.getState();
    this.getStaff();
    this.postclient();
    this.checkUserRole();
  

    








  }
  Type!: string;
  checkUserRole() {
    this.Type = localStorage.getItem('Type') || '';
    if (this.Type === 'admin') {
      this.createproductform.get('Selectstaff')?.setValidators(Validators.required);
    } else if (this.Type === 'staff') {
      this.createproductform.removeControl('Selectstaff');
    }
  }

  stateList: any = [];
  // getState() {
  //   this.employeeService.GetState().subscribe((response: any) => {
  //     if (response.statusCode === 200) {
  //       this.stateList = response.data;
  //     }
  //   });
  // }
  citiesList: any = [];
  //  getcities(state_id: any) {
  //   this.employeeService.getCity(state_id).subscribe(
  //     (response: any) => {
  //       if (response.statusCode === 200) {
  //         this.citiesList = response.data;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching cities:', error);
  //     }
  //   );
  // }



  getState() {
    this.employeeService.GetState().subscribe((response: any) => {
      if (response.status === 200) {
        this.stateList = response.data;
      } else {
        console.error('Failed to load states', response);
      }
    });
  }


  onStateChange(event: Event) {
   
    const selectedStateId = (event.target as HTMLSelectElement).value;
  
    if (selectedStateId) {
      console.log('Selected State ID:', selectedStateId); 
      this.getcities(selectedStateId); 
    } else {
      this.citiesList = []; 
    }
  }
 
  getcities(state_id: any) {
    this.employeeService.getCity(state_id).subscribe(
      (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.citiesList = response.data; // Set the cities list from response
          console.log('Cities loaded successfully:', this.citiesList);
        } else {
          console.error('Failed to load cities, unexpected response:', response);
        }
      },
      (error: any) => {
        // Log the entire error object to understand its structure
        console.error('Error fetching cities:', error);
  
        // Safely check and log error details
        if (error && error.error) {
          console.error('Error details:', error.error);
        } else if (error && error.message) {
          console.error('Error message:', error.message); // Log error message if available
        } else {
          console.error('Unexpected error format:', error); // Handle completely unexpected formats
        }
      }
    );
  }
  
  





  staffList: any = [];
  getStaff() {
    this.employeeService.GetStaff().subscribe((response: any) => {
      if (response.status === 200) {
        this.staffList = response.staffs;
      }
    });
  }
  clientList: any = [];
  postclient() {
    this.employeeService.getClientParties().subscribe((response: any) => {
      if (response.status === 200) {
        this.clientList = response.parties;
      }
    });
  }
 

  





  projects: projects = new projects();
  user_id: any
  createprojects() {
    console.log(this.createproductform.get('projectname')?.value)
    console.log(this.createproductform.get('Address')?.value)
    console.log(this.createproductform.get('State')?.value)
    console.log(this.createproductform.get('City')?.value)
    console.log(this.createproductform.get('description')?.value)
    console.log(this.createproductform.get('StartDate')?.value)
    console.log(this.createproductform.get('endDate')?.value)
    console.log(this.createproductform.get('Selectstaff')?.value)
    console.log(this.createproductform.get('SelectClient')?.value)
    if (this.createproductform.valid) {
      this.projects.name = this.createproductform.get('projectname')?.value;
      this.projects.address = this.createproductform.get('Address')?.value;
      this.projects.state_id = this.createproductform.get('State')?.value;
      this.projects.city_id = this.createproductform.get('City')?.value;
      this.projects.assign_to_id = this.createproductform.get('Selectstaff')?.value;
      this.projects.party_id = this.createproductform.get('SelectClient')?.value;
      this.projects.description = this.createproductform.get('description')?.value;
      this.projects.start_date = this.createproductform.get('StartDate')?.value;
      this.projects.end_date = this.createproductform.get('endDate')?.value;
       this.projects.user_id = this.user_id
     // Conditionally set assign_to_id based on user role
     if (this.Type === 'admin') {
      if (this.createproductform.get('Selectstaff')?.value) {
        this.projects.assign_to_id = this.createproductform.get('Selectstaff')?.value;
      } else {
        console.error('Select Staff is required for admin users.');
        return; 
      }
    }

      const body = JSON.stringify(this.projects);
      console.log(body);
      this.employeeService.createProject(body).subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.closeModal();
          // this.successName = 'Batch';
          // this.ngOnInit();
          this.getOngoingproject(0);
          // this.dataService.changeMessage({ message: "projects Created" });
          // this.router.navigate(['/master/projects']);
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
