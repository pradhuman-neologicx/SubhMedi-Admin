import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})

  export class PartiesComponent {


    showreset: any = false
    searchText: any;
    tableSize: any = 10;
    tableSizes: any = [10, 20, 50, 100, 'all'];
    totalRecords: any;
    page: number = 1;
    searchbarform!: FormGroup;
      CreateliveexamForm!:  FormGroup;
      addeventform!:  FormGroup;
     
      orderviewform!:  FormGroup;
  
     orderviewopen: boolean = false;
     addeventOpen: boolean = false;
     deleteeventOpen: boolean = false;
    
    
      constructor(
        private formBuilder: FormBuilder,
      
      ) {}
    
    
      ngOnInit(): void {
        this.Bulkuploadform = this.formBuilder.group({
          UploadFile: ["", [
            Validators.required,
          ],],
        });
        this.searchbarform = this.formBuilder.group({
          searchbar: ["", [Validators.required,]]
        });
        this.orderviewform = this.formBuilder.group({
          orderid: ["", [
          
          ],],
    
          customer: ["", [
           
         
          ],],
          date: ["", [
           
         
          ],],
          Paid: ["", [
           
         
          ],],
          Amount: ["", [
           
         
          ],],
         
       
      
       
              });
     
     
  
      
     
        
  
  
       
  
      }
  
      
   
    
   
  
  
  
      orderTable=[
      {
        serialNo: "",
        orderID :"B10112",
        bookingdate:"23/08/2024",
        customer:"Shreya Singh",
        paid:"2000",
        amount:"4500",
        action: "",
      },
      {
        serialNo: "",
        orderID :"B10112",
        bookingdate:"23/08/2024",
        customer:"Shreya Singh",
        paid:"2000",
        amount:"4500",
        action: "",
      },
      {
        serialNo: "",
        orderID :"B10112",
        bookingdate:"23/08/2024",
        customer:"Shreya Singh",
        paid:"2000",
        amount:"4500",
        action: "",
      },
      {
        serialNo: "",
        orderID :"B10112",
        bookingdate:"23/08/2024",
        customer:"Shreya Singh",
        paid:"2000",
        amount:"4500",
        action: "",
      },
    
   
     
    
     ]
     table_heading = [
      {
        heading0: "Serial No.",
        heading1: "Order ID",
        heading2: "Customer Name",
        heading3: "Booking Date",
        heading4: "Paid Amount",
        heading5: "Total Amount",
        heading6: "Action",
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
    viewmodal() {
      this.orderviewopen = true;
    }
    closeModal() {
      this.addeventOpen = false;
      this.BulkUploadExcel = false;
    
    
      this.Excel = false;
      this.orderviewopen = false;
      this.deleteeventOpen = false;
    
    
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
  downloadcourseFile(){}
  
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
