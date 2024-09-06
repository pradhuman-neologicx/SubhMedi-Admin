import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-homematerial',
  templateUrl: './homematerial.component.html',
  styleUrl: './homematerial.component.scss'
})


  export class HomematerialComponent {
    FilterForm!: FormGroup;
  
    showreset: any = false
    searchText: any;
    tableSize: any = 10;
    tableSizes: any = [10, 20, 50, 100, 'all'];
    totalRecords: any;
    page: number = 1;
    searchbarform!: FormGroup;
    CreateliveexamForm!: FormGroup;
    addpurchaseform!: FormGroup;
  
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


      this.FilterForm = this.formBuilder.group({
        StartDate: [''],
        enddate: [''],
        daterange: [''],
      });
  
  
  
      this.addpurchaseform = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
        selectpartyname: ["", [Validators.required,]],
        additionalcharges: [""],
        Discount: [""],
        Payment: [""],
        Balance: [""],
        cheque: [""],
      
        Notes: [""],
        Reference: [""],
        addMaterials: ["", [Validators.required,]],
        materials: this.formBuilder.array([]) ,
        Amount: [""],
        profileimage: ['',],
        SubTotal: ['',],
     
      });
     
  
  
      this.Getpartynamefun();
      this.Getmaterialaddfun();
   
    
  
      
  
  
  
  
  
  
  
  
    }
 
   // Getter for FormArray
   get materials(): FormArray {
    return this.addpurchaseform.get('materials') as FormArray;
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
      this.materials.push(this.createMaterialGroup(e.name,e.id));
    });
  }

  // Create FormGroup for each material
  createMaterialGroup(materialName:any,materialId:any): FormGroup {
    return this.formBuilder.group({
      id: [materialId],
      name: [materialName],
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
   
    partryecievetable: any
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
              this.partryecievetable = response.party_received ;
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
                this.partryecievetable = response.party_received ;
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
      this.addpurchaseform.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.addpurchaseform.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addpurchaseform.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.addpurchaseform.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.addpurchaseform.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addpurchaseform.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.addpurchaseform.get('Payment')?.clearValidators();
      this.addpurchaseform.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.addpurchaseform.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.addpurchaseform.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.addpurchaseform.get('Payment')?.updateValueAndValidity();
      this.addpurchaseform.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.addpurchaseform.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.addpurchaseform.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addpurchaseform.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.addpurchaseform.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.addpurchaseform.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.addpurchaseform.get('Reference')?.updateValueAndValidity();

    }
   
  
    purchasegopen: boolean = false;
    purchasecreatemodal() {
      this.purchasegopen = true;
    }
    closeModal() {
      this.purchasegopen = false;
    
    }
    toggleAMatDetails() {
      this.showreaddmaterialDetails = !this.showreaddmaterialDetails;

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
  


    
  errorMessage: any;
  submitted!: boolean;
 
  erroroutput: boolean = false;
  Createaddpurchase() {
    if (this.addpurchaseform.valid) {
      if (this.materials.length>0) {

      
      const formData: FormData = new FormData();

      var newMateria=[];
      for (let index = 0; index < this.materials.length; index++) {
        const addpurchaseform =   this.materials.at(index);
  
    
        // Safely parse values from the form controls, defaulting to 0 if invalid or empty
        const units: number = parseFloat(addpurchaseform.get('units')?.value ?? '0') || 0;
        const unitsRange: number = parseFloat(addpurchaseform.get('unitsRange')?.value ?? '0') || 0;
        const discount: number = parseFloat(addpurchaseform.get('discount')?.value ?? '0') || 0;
        newMateria.push({
          "id":addpurchaseform.get('id')?.value,
          "name": addpurchaseform.get('name')?.value,
          "quantity":units.toString(),
          "discount":
          discount.toString(),
          "amount": addpurchaseform.get('subtotal')?.value,
          "unit_rate":unitsRange.toString()
        })
      
    }

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.addpurchaseform.get("date")?.value.toString());
      formData.append("party_id", this.addpurchaseform.get("selectpartyname")?.value.toString());
      formData.append("materials", JSON.stringify(newMateria)); // Convert materialList to JSON string if it's an object
      formData.append("additional_charges", this.addpurchaseform.get("additionalcharges")?.value.toString());
      formData.append("discount", this.addpurchaseform.get("Discount")?.value.toString());
      formData.append("total_amount", this.calculateTotal().toString());
      formData.append("payment_out", this.addpurchaseform.get("Payment")?.value.toString());
      formData.append("payment_method", this.addpurchaseform.get("cheque")?.value.toString());
      formData.append("balance", this.calculatebalanceTotal().toString());
      formData.append("notes", this.addpurchaseform.get("Notes")?.value.toString());
      formData.append("reference_no", this.addpurchaseform.get("Reference")?.value.toString());
      formData.append("sub_total", this.calculateSubTotal().toString());
  
     
      if (this.profileimage) {
        // If image exists, add it to FormData
      

        const file = this.profileimage;
        formData.append("bill_image", file, file.name);
      }
  
      // Call the API service
      this.employeeService.purchasematerials(formData).subscribe((response: any) => {
        this.errorMessage = response.errorMessage;
  
        if (response.status === 200) {
          this.closeModal();
          this.ngOnInit();
  
          // Save profile picture URL
  
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
      this.addpurchaseform.markAllAsTouched();
      console.log(this.findInvalidControls(this.addpurchaseform));
    }
    } else {
      // Mark all form fields as touched to show validation errors
        this.errorMessage = 'fill all the details Correctly'
      this.addpurchaseform.markAllAsTouched();
      console.log(this.findInvalidControls(this.addpurchaseform));
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
    
    const totaamount = parseFloat(this.addpurchaseform.get("Amount")?.value ?? '') || 0;
    const paymentout = parseFloat(this.addpurchaseform.get("Payment")?.value ?? '') || 0;
  
   
    const total =  this.calculateTotal() - paymentout;
  
   
    // this.totalAmountControl.setValue(total.toString());
  
    return total;
  }
  


  calculateTotal(): number {
    
    const additionalCharge = parseFloat(this.addpurchaseform.get("additionalcharges")?.value ?? '') || 0;
    const discount = parseFloat(this.addpurchaseform.get("Discount")?.value ?? '') || 0;
  
   
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

    
    const addpurchaseform =   this.materials.at(index);
  
    
    // Safely parse values from the form controls, defaulting to 0 if invalid or empty
    const units: number = parseFloat(addpurchaseform.get('units')?.value ?? '0') || 0;
    const unitsRange: number = parseFloat(addpurchaseform.get('unitsRange')?.value ?? '0') || 0;
    const discount: number = parseFloat(addpurchaseform.get('discount')?.value ?? '0') || 0;

    // Perform the calculation: (qty * unitrate) - discount
     total = (units * unitsRange) - discount;
    }
    return total;
  }

  }
