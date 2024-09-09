import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';


@Component({
  selector: 'app-hometransactions',
  templateUrl: './hometransactions.component.html',
  styleUrl: './hometransactions.component.scss',
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


  export class HometransactionsComponent {
    FilterForm!: FormGroup;
    successName: any = "";
    openSecondsuccess: boolean = false;
    showreset: any = false
    searchText: any;
    tableSize: any = 10;
    tableSizes: any = [10, 20, 50, 100, 'all'];
    totalRecords: any;
    page: number = 1;
    searchbarform!: FormGroup;
    CreateliveexamForm!: FormGroup;
    addsubcontractorform!: FormGroup;
    addcategoryform!: FormGroup;
    addpaymentinform!: FormGroup;
  
    orderviewform!: FormGroup;
  
    projectgopen: boolean = false;
    addeventOpen: boolean = false;
    deleteeventOpen: boolean = false;
  
    projectiD : any
    constructor(
      private formBuilder: FormBuilder,
      private employeeService: EmployeeService,
      private jwtService: JwtService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      // const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
      // this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
      // const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
      // const urlSegments = this.router.url.split(urlDelimitators);
      // this.projectID = urlSegments[2]; // Assuming 'id' is at index 2
      // this.partyID = urlSegments[3]; // Assuming 'party_id' is at index 3
      const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
      this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
     }
     todayDate!: string;
     projectID: any;
     partyID: any;
    ngOnInit(): void {
      this.todayDate = new Date().toISOString().split('T')[0];
    // Retrieve both IDs using paramMap
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    console.log('Party ID:', this.partyID);
      this.user_id= this.jwtService.getpanelUserId();


      // this.FilterForm = this.formBuilder.group({
      //   StartDate: [''],
      //   enddate: [''],
      //   daterange: [''],
      // });
  
    
      this.addcategoryform = this.formBuilder.group({
        category: ['',[Validators.required,]],
    
      });
      this.FilterForm = this.formBuilder.group({
        filter: [''],
        Transactiontype: [''],
      
      });
  
  
    
  
      this.addsubcontractorform = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
       
        additionalcharges: [""],
        Discount: [""],
        Payment: [""],
        Balance: [""],
        cheque: [""],
      
        Notes: [""],
        Reference: [""],
      
        materials: this.formBuilder.array([]) ,
        Amount: [""],
        profileimage: ['',],
        SubTotal: ['',],
     
      });
     
  
  
      this.Getpartynamefun();
      this.Getalltranslations(0)
   
    
  
      
  
  
  
  
  
  
  
  
    }
 
   // Getter for FormArray
   get materials(): FormArray {
    return this.addsubcontractorform.get('materials') as FormArray;
  }
 
  initialmaterials() {
    return this.formBuilder.group({
      // Input: ["", [Validators.required]],
      id: [''],
      Name: [''],
      discount: [''],
      units: [''],
      unitsRange: [''],
      subtotal: [''],
    });
  }
 

  // On change event for ng-select
  onMaterialsChange(selectedMaterials: any[]) {
    this.materials.clear(); // Clear existing FormArray controls
    selectedMaterials.forEach((e:any) => {
      this.materials.push(this.createMaterialGroup());
    });
  }

  // Create FormGroup for each material
  createMaterialGroup(): FormGroup {
    return this.formBuilder.group({
      
      name: ['materialName', Validators.required],
      subTotal: [''],
      discount: [''],
      units: ['', Validators.required],
      unitsRange: ['', Validators.required]
    });
  }

    idString: any;
    partyType: any
    id: any;
    Type!: string;
   
   // upload image  code here
   @ViewChild('fileInput') fileInput!: ElementRef;

   @Output() fileSelected = new EventEmitter<File>();
   imageUrl: string | ArrayBuffer | null = null;
   profileimage!: any;
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
  
    onDragLeave(event: any): void {
      event.preventDefault();
    }
  
  


    partynamelist:any
    Getpartynamefun() {
      this.employeeService.GetpartynamelistApi().subscribe((response: any) => {
        if (response.status === 200) {
          
          this.partynamelist = response.suppliers
        }
      });
    }
  
    materialtablelist: any
    Getmaterialaddfun() {
      this.employeeService.GetmattlistApi().subscribe((response: any) => {
        if (response.status === 200) {
          
          this.materialtablelist = response.materials
        }
      });
    }


    projects: projects = new projects();
    user_id: any
   
  transactiontable: any
    partypaidtable: any
    salarytable: any
    otherexpensetable: any
    materialpurchasetable: any
    subcontractortable: any
    
    name: any
    type: any
    amount: any
    status: any
  
    dateValidator(formGroup: any) {
      const StartDate = formGroup.get('StartDate').value;
      const enddate = formGroup.get('enddate').value;
      if (StartDate && enddate) {
        if (enddate <= StartDate) {
          return { invalidDateSequence: true };
        }
      }
      return null;
    }

 
    getpartyprojectbalance(type: any) {
      // if (!this.isAtLeastOneFieldFilled()) {
      
      // }
      if (type === 0) {
      

        this.employeeService
          .getProjectPartiesBalance(this.projectID, this.partyID,this.FilterForm.get('daterange')?.value,this.FilterForm.get('StartDate')?.value ,this.FilterForm.get('enddate')?.value)
          .subscribe(
            (response: any) => {
              // Handling the response data
              this.name = response.party?.name ;
              this.type = response.party?.type ;
              this.amount = response.party?.amount ;
              this.status = response.party?.status ;
              this.transactiontable = response.party_received ;
              this.partypaidtable = response.party_paid ;
              this.subcontractortable = response.subcontractor ;
              this.otherexpensetable = response.other_expense ;
              this.salarytable = response.attendanceData ;
              this.materialpurchasetable = response.material_purchase ;
            },
            (error: any) => {
              console.error('Error fetching project party balance:', error);
              // Handle the error scenario
            }
          );
} 
else {
        // With search condition; ensure the form is valid
        if (this.FilterForm.valid) {
          this.employeeService
            .getProjectPartiesBalance(
              this.projectID,
              this.partyID,
              this.FilterForm.get('daterange')?.value,this.FilterForm.get('StartDate')?.value ,this.FilterForm.get('enddate')?.value
            )
            .subscribe(
              (response: any) => {
                // Handling the response data
                this.name = response.party?.name ;
                this.type = response.party?.type ;
                this.amount = response.party?.amount ;
                this.status = response.party?.status ;
                this.transactiontable = response.party_received ;
                this.partypaidtable = response.party_paid ;
                this.subcontractortable = response.subcontractor ;
                this.otherexpensetable = response.other_expense ;
                this.salarytable = response.attendanceData ;
                this.materialpurchasetable = response.material_purchase ;
              },
              (error: any) => {
                console.error('Error fetching project party balance:', error);
                // Handle the error scenario
              }
            );
        } else {
          // Mark form fields as touched to display validation errors
          this.FilterForm.markAllAsTouched();
        }
      }
    }
    
  
  
  


   


  

  
  
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
  
    showadditionalDetails = false;
    showdiscountDetails = false;
    showpaymentDetails = false;
    shownotesDetails = false;
    showreferenceDetails = false;
    showreaddmaterialDetails = false;

    toggleADetails() {
      this.showadditionalDetails = !this.showadditionalDetails;
      this.addsubcontractorform.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.addsubcontractorform.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addsubcontractorform.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.addsubcontractorform.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.addsubcontractorform.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addsubcontractorform.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.addsubcontractorform.get('Payment')?.clearValidators();
      this.addsubcontractorform.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.addsubcontractorform.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.addsubcontractorform.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.addsubcontractorform.get('Payment')?.updateValueAndValidity();
      this.addsubcontractorform.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.addsubcontractorform.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.addsubcontractorform.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addsubcontractorform.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.addsubcontractorform.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.addsubcontractorform.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addsubcontractorform.get('Reference')?.updateValueAndValidity();

    }
    @Output() closeModalEvent = new EventEmitter<void>();
  
    addsubcontractoropen: boolean = false;
    addpaymentinopen: boolean = false;
    transactioncreatemodal() {
      this.addsubcontractoropen = true;
    }
    transactionpaymwentincreatemodal() {
      this.addpaymentinopen = true;
    }
    closeModal() {
      this.addsubcontractoropen = false;
      this.addpaymentinopen = false;
      this.billsopen = false;
      this.Subcontractoropen = false;
      this.otherexpenseopen = false;
      this.paymenteopen = false;
      this.closeModalEvent.emit();
    }
    toggleAMatDetails() {
      this.showreaddmaterialDetails = !this.showreaddmaterialDetails;
      this.materials.clear(); // Clear existing FormArray controls
      this.materials.push(this.createMaterialGroup());

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
  
  
    @Output() addmodelEvent = new EventEmitter<string>();

    paymentinadd() {
     
    
    this.clickin = this.generateUniqueId();
    
    this.addmodelEvent.emit(this.clickin)
      } 


clickin:string = '0'

clickadd:string = '0'
    Createadd() {
  if (this.catergory=='Sub Contractor Payment' ){

this.clickadd = this.generateUniqueId();

this.addmodelEvent.emit(this.clickadd)
  } else if (this.catergory=='Other Expense') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }else if (this.catergory=='Material Purchase') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }
  else if (this.catergory=='Salary') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }
  else if (this.catergory=='Petty Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }
  else if (this.catergory=='Miscellaneous Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }  else if (this.catergory=='Labour Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  } else if (this.catergory=='Fuel Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  } else if (this.catergory=='Machinery Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }else if (this.catergory=='Electric Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }else if (this.catergory=='Water Expenses') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }else if (this.catergory=='Supervisor Payment') {
    this.clickadd = this.generateUniqueId();

    this.addmodelEvent.emit(this.clickadd)
  }
    }
    selectedIn!: any;
  selectEventHanderIn($event: any) {
    this.selectedIn = $event;
    if (this.selectedIn == 'close') {
      this.successName = 'Transaction Done';
      this.closeModal()
      this.ngOnInit();
      this.Getalltranslations(0);
      
      setTimeout(() => {
        this.openSecondsuccess = true;
        setTimeout(() => {
          this.openSecondsuccess = false;
        }, 1800);
      }, 200);
    }else{
      this.errorMessage=this.selectedIn;
    }
    console.log(this.selectedIn);
  }

    generateUniqueId(): string {
      return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    }
  errorMessage: any;
  submitted!: boolean;
 
  erroroutput: boolean = false;
  Createaddpurchase() {
    if (this.addsubcontractorform.valid) {
      if (this.materials.length>0) {

      
      const formData: FormData = new FormData();

      var newMateria=[];
      for (let index = 0; index < this.materials.length; index++) {
        const addsubcontractorform =   this.materials.at(index);
  
    
        // Safely parse values from the form controls, defaulting to 0 if invalid or empty
        const units: number = parseFloat(addsubcontractorform.get('units')?.value ?? '0') || 0;
        const unitsRange: number = parseFloat(addsubcontractorform.get('unitsRange')?.value ?? '0') || 0;
        const discount: number = parseFloat(addsubcontractorform.get('discount')?.value ?? '0') || 0;
        newMateria.push({
          "id":addsubcontractorform.get('id')?.value,
          "name": addsubcontractorform.get('name')?.value,
          "quantity":units.toString(),
          "discount":
          discount.toString(),
          "amount": addsubcontractorform.get('subtotal')?.value,
          "unit_rate":unitsRange.toString()
        })
      
    }

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.addsubcontractorform.get("date")?.value.toString());
      formData.append("party_id", this.addsubcontractorform.get("category")?.value.toString());
      formData.append("materials", JSON.stringify(newMateria)); // Convert materialList to JSON string if it's an object
      formData.append("additional_charges", this.addsubcontractorform.get("additionalcharges")?.value.toString());
      formData.append("discount", this.addsubcontractorform.get("Discount")?.value.toString());
      formData.append("total_amount", this.calculateTotal().toString());
      formData.append("payment_out", this.addsubcontractorform.get("Payment")?.value.toString());
      formData.append("payment_method", this.addsubcontractorform.get("cheque")?.value.toString());
      formData.append("balance", this.calculatebalanceTotal().toString());
      formData.append("notes", this.addsubcontractorform.get("Notes")?.value.toString());
      formData.append("reference_no", this.addsubcontractorform.get("Reference")?.value.toString());
      formData.append("sub_total", this.calculateSubTotal().toString());
  
     
      if (this.profileimage) {
        // If image exists, add it to FormData
      

        const file = this.profileimage;
        formData.append("bill_image", file, file.name);
      }
  
      // Call the API service
      this.employeeService.purchasematerials(formData).subscribe((response: any) => {
        if (typeof response.message === 'object' && response.message !== null && !Array.isArray(response.message)) {
          this.errorMessage = JSON.stringify(response.message);
        } else {
          this.errorMessage = response.message;
        }
  
        if (response.status === 200) {
          this.closeModal();
          this.ngOnInit();
  
          // Save profile picture URL
          this.jwtService.saveImageUrl(response.data.profilePicture);
          this.clearFileWithoutevent();
  
          // Optionally display success message
          setTimeout(() => {
            // this.openSecondsuccess = true;
            setTimeout(() => {
              // this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        } else {
          this.submitted = false;
        }
      });
    }else {
      // Mark all form fields as touched to show validation errors
        this.errorMessage = 'please select at least one material'
      this.addsubcontractorform.markAllAsTouched();
      console.log(this.findInvalidControls(this.addsubcontractorform));
    }
    } else {
      // Mark all form fields as touched to show validation errors
        this.errorMessage = 'fill all the details Correctly'
      this.addsubcontractorform.markAllAsTouched();
      console.log(this.findInvalidControls(this.addsubcontractorform));
    }
  }
  
  findInvalidControls(formName: any) {
    const invalid = [];
    const controls = formName.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
    return invalid;
  }
  

  additionalCharge: number = 0;
  discount: number = 0;
  totalAmount: number = 0;

  // Form control objects (similar to text controllers in Flutter)
  



  calculatebalanceTotal(): number {
    
    const totaamount = parseFloat(this.addsubcontractorform.get("Amount")?.value ?? '') || 0;
    const paymentout = parseFloat(this.addsubcontractorform.get("Payment")?.value ?? '') || 0;
  
   
    const total =  this.calculateTotal() - paymentout;
  
   
    // this.totalAmountControl.setValue(total.toString());
  
    return total;
  }
  


  calculateTotal(): number {
    
    const additionalCharge = parseFloat(this.addsubcontractorform.get("additionalcharges")?.value ?? '') || 0;
    const discount = parseFloat(this.addsubcontractorform.get("Discount")?.value ?? '') || 0;
  
   
    const total = this.calculateSubTotal() + additionalCharge - discount;
  
   
    // this.totalAmountControl.setValue(total.toString());
  
    return total;
  }



   // Function to calculate subtotal
   calculateSubTotal(): number {
    let value: number = 0; 
    if(this.materials.length>0){// TypeScript uses 'number' instead of 'double'
 
      for (let index = 0; index < this.materials.length; index++) {
        value += this.calculatePerMaterialAmount(index,1);
      
    }
  }
    
    return value;
  }
  formControls: FormGroup[] = []; // Array of FormGroups for each material item
  calculatePerMaterialAmount(index: number,type:any): number {
    console.log(type);
    console.log(this.materials.length);
    
    // Get the form control at the specified index
    let total: number=0;
    if(this.materials.length>0){

    
    const addsubcontractorform =   this.materials.at(index);
  
    
    // Safely parse values from the form controls, defaulting to 0 if invalid or empty
    const units: number = parseFloat(addsubcontractorform.get('units')?.value ?? '0') || 0;
    const unitsRange: number = parseFloat(addsubcontractorform.get('unitsRange')?.value ?? '0') || 0;
    const discount: number = parseFloat(addsubcontractorform.get('discount')?.value ?? '0') || 0;

    // Perform the calculation: (qty * unitrate) - discount
     total = (units * unitsRange) - discount;
    }
    return total;
  }


catergory:any
  onchangecategory(value:any) {
  this.catergory=value
  }


  
  // Getalltransaltions() {
  //   this.employeeService.gettransaction(this.projectiD).subscribe((response: any) => {
  //     if (response.status === 200) {
        
  //       this.transactiontable = response.transaction_list
  //     }
  //   });
  // }



  sum_out: number = 0
  sum_in: number = 0;
  balance: number = 0;

  Getalltranslations(type: any) {
    // Check if the type is 0
    if (type === 0) {
      // Fetch transaction data based on type 0
      this.employeeService.gettransaction(this.projectiD,this.FilterForm.get('Transactiontype')?.value,this.FilterForm.get('filter')?.value ?? "",).subscribe(
        (response: any) => {
          if (response.status === 200) {
            // Handle response data for type 0
            this.balance = response.balance || 0;
            this.sum_in = response.sum_in || 0;
            this.sum_out = response.sum_out || 0;
        
         
            this.transactiontable = response.transaction_list;
          }
        },
        (error: any) => {
          console.error('Error fetching transactions:', error);
          // Handle the error scenario
        }
      );
    } else {
      // Ensure form validation if applicable
      if (this.FilterForm.valid) {
        this.employeeService
          .gettransaction(this.projectiD,this.FilterForm.get('Transactiontype')?.value,this.FilterForm.get('filter')?.value ?? "",)
          .subscribe(
            (response: any) => {
              if (response.status === 200) {
                // Handle response data
                this.balance = response.balance || 0;
                this.sum_in = response.sum_in || 0;
                this.sum_out = response.sum_out || 0;
                this.transactiontable = response.transaction_list;
              }
            },
            (error: any) => {
              console.error('Error fetching transactions:', error);
              // Handle the error scenario
            }
          );
      } else {
        // Mark form fields as touched to display validation errors
        this.FilterForm.markAllAsTouched();
      }
    }
  }
  

// bills //
billsopen: boolean = false;
Subcontractoropen: boolean = false;
otherexpenseopen: boolean = false;
paymenteopen: boolean = false;
partybillsid:any;
currenttypeid : any
// viewmodel(id:any, type:any){
// this.partybillsid =id;
// this.currenttypeid =type;
// this.billsopen = true;
// this.Subcontractoropen = true;
// this.getbills();
// }

viewmodel(id: any, type: any) {
  this.partybillsid = id;
  this.currenttypeid = type;

  // Reset both flags to false before setting the specific one to true
  this.billsopen = false;
  this.Subcontractoropen = false;
  this.otherexpenseopen = false;
  this.paymenteopen = false;

  // Set the correct modal based on the type
  if (type === 'material_purchase') {
    this.billsopen = true; 
  } else if (type === 'sub_contractor_payment') {
    this.Subcontractoropen = true; 
  } else if (type === 'other_expense') {
    this.otherexpenseopen = true; 
  } else {
    this.paymenteopen = true; 
  }


  this.getbills(); 
}



billstable:any
subcontrtable : any
otherexpenetable : any
paytable : any
getbills(){
this.employeeService
    .getpartybills(this.partybillsid,this.currenttypeid,)
    .subscribe((response: any) => {
        if (response.status === 200) {
            this.billstable = response.party_bill;
            this.subcontrtable = response.party_bill;
            this.otherexpenetable = response.party_bill;
            this.paytable = response.party_bill;
           
        }
    });
}

ClickpayfeesModalconent(event: Event): void {
  event.stopPropagation();
}
  }
