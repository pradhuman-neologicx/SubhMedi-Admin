import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})


  export class SalaryComponent {
  
    @Input() salarytype!: string;
    salarytypeform!: FormGroup;
  
  
  
  
    projectiD : any
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
     todayDate!: string;
     projectID: any;
     partyID: any;
     ngOnChanges(changes: SimpleChanges) {
      console.log('salarytype updated:', this.salarytype);
      if (changes['salarytype'] && changes['salarytype'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when salarytype updates
        console.log('salarytype updated:', changes['salarytype'].currentValue);
        this.initializeComponent(changes['salarytype'].currentValue);
      }
    }
  
    // Initialization logic based on salarytype changes
    private initializeComponent(salarytypeValue: any) {
      // Place any logic that should run when salarytype changes
      console.log('Initialization logic executed with salarytype:', salarytypeValue);
      // Add more initialization steps as needed
      if (salarytypeValue!='0'|| salarytypeValue !=0){
        this.createsalarytype()
      }
      
    }
  
    ngOnInit(): void {
      this.todayDate = new Date().toISOString().split('T')[0];
    // Retrieve both IDs using paramMap
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    console.log('Party ID:', this.partyID);
    console.log('salarytype:', this.salarytype);
      this.user_id= this.jwtService.getpanelUserId();


    
  
     
  
      this.salarytypeform = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
        selectpartyname: ["", [Validators.required,]],
       SubTotal: ['',Validators.required],
       cheque: ["",Validators.required],
       description: [""],
       profileimage: ['',],
       Balance: ['',],
  
      
     
      
       
      
     
 
      
     
      });
     
  
  
      this.Getpartynamesubcontractorfun();
      this.Getunitsn();
    
   
    
  
      
  
  
  
  
  
  
  
  
    }

  
 

  // On change event for ng-select
  // onMaterialsChange(selectedMaterials: any[]) {
  //   this.materials.clear(); // Clear existing FormArray controls
  //   selectedMaterials.forEach((e:any) => {
  //     this.materials.push(this.createMaterialGroup());
  //   });
  // }

 


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
    Getpartynamesubcontractorfun() {
      this.employeeService.getsalarytype(this.projectiD).subscribe((response: any) => {
        if (response.status === 200) {
          
          this.partynamelist = response.parties
        }
      });
    }
    getunitslist:any
    Getunitsn() {
      this.employeeService.Getunitsformarray().subscribe((response: any) => {
        if (response.status === 200) {
          
          this.getunitslist = response.units.filter((item: any) => item.is_active == 1);
        }
      });
    }
  
    

    projects: projects = new projects();
    user_id: any
   
    partryecievetable: any
    partypaidtable: any
    salarytable: any
    otherexpensetable: any
    salarytypetable: any
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

 
    
           
    
  
  
  
    balanceamoujnt:any
    getbalanceparty() {
      this.employeeService.getbalance(this.projectiD,this.partyid).subscribe((response: any) => {
        if (response.status === 200) {
          
          this.balanceamoujnt = response.parties
  
          this.salarytypeform.get("Balance")?.setValue(response.parties!=undefined?response.parties.length>0?response.parties[0].balance:0:0)
        }
      });
    }
    partyid:any
    onchange(partyid:any){
      this.partyid =partyid
  this.getbalanceparty()
    }
  




  

  
  
  
    showadditionalDetails = false;
    showdiscountDetails = false;
    showpaymentDetails = false;
    shownotesDetails = false;
    showreferenceDetails = false;
    showreaddmaterialDetails = false;

    toggleADetails() {
      this.showadditionalDetails = !this.showadditionalDetails;
      this.salarytypeform.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.salarytypeform.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.salarytypeform.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.salarytypeform.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.salarytypeform.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.salarytypeform.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.salarytypeform.get('Payment')?.clearValidators();
      this.salarytypeform.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.salarytypeform.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.salarytypeform.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.salarytypeform.get('Payment')?.updateValueAndValidity();
      this.salarytypeform.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.salarytypeform.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.salarytypeform.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.salarytypeform.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.salarytypeform.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.salarytypeform.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.salarytypeform.get('Reference')?.updateValueAndValidity();

    }
   
  
    addsubcontractoropen: boolean = false;
    transactioncreatemodal() {
      this.addsubcontractoropen = true;
    }
    closeModal() {
      this.addsubcontractoropen = false;
    
    }
   
   
  
  
  
  
  
  
  
    resetFilter() {
      window.location.reload();
    }
  
  
  
  
  
  
  
  


    
  errorMessage: any;
  submitted!: boolean;
  @Output() selectedIn = new EventEmitter<string>();
  erroroutput: boolean = false;
  createsalarytype() {
    if (this.salarytypeform.valid) {
    

      
      const formData: FormData = new FormData();

     

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.salarytypeform.get("date")?.value.toString());
      formData.append("party_id", this.salarytypeform.get("selectpartyname")?.value.toString());
      formData.append("amount", this.salarytypeform.get("SubTotal")?.value.toString());
      formData.append("description", this.salarytypeform.get("description")?.value.toString());
   
   
      formData.append("category", 'salary');
   
   
      formData.append("payment_method", this.salarytypeform.get("cheque")?.value.toString());
 
  
  
     
      if (this.profileimage) {
        // If image exists, add it to FormData
      

        const file = this.profileimage;
        formData.append("image", file, file.name);
      }
  
      // Call the API service
      this.employeeService.addsubcotractorpaymentout(formData).subscribe((response: any) => {
        if (typeof response.message === 'object' && response.message !== null && !Array.isArray(response.message)) {
          this.errorMessage = JSON.stringify(response.message);
        } else {
          this.errorMessage = response.message;
        }
  
        if (response.status === 200) {
          this.closeModal();
          this.selectedIn.emit('close');
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
         
          this.selectedIn.emit(this.errorMessage);
          this.submitted = false;
        }
      });
    
    } else {
      // Mark all form fields as touched to show validation errors
        this.errorMessage = 'fill all the details Correctly'
      this.salarytypeform.markAllAsTouched();
      this.selectedIn.emit('fill all the details Correctly');
      console.log(this.findInvalidControls(this.salarytypeform));
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
  

 

catergory:any
  onchangecategory(value:any) {
  this.catergory=value
  }

  }

