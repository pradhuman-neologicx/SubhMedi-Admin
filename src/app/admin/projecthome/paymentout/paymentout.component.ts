import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-paymentout',
  templateUrl: './paymentout.component.html',
  styleUrl: './paymentout.component.scss',
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


  export class PaymentoutComponent {
    openSecondsuccess: boolean = false;
    @Input() paymentintype!: string;
    paymentinform!: FormGroup;
  
  
  
  
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
      console.log('paymentintype updated:', this.paymentintype);
      if (changes['paymentintype'] && changes['paymentintype'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when paymentintype updates
        console.log('paymentintype updated:', changes['paymentintype'].currentValue);
        this.initializeComponent(changes['paymentintype'].currentValue);
      }
    }
  
    // Initialization logic based on paymentintype changes
    private initializeComponent(paymentintypeValue: any) {
      // Place any logic that should run when paymentintype changes
      console.log('Initialization logic executed with paymentintype:', paymentintypeValue);
      // Add more initialization steps as needed
      if (paymentintypeValue!='0'|| paymentintypeValue !=0){
        this.creatpaymentouttype()
      }
      
    }
  
    ngOnInit(): void {
      this.todayDate = new Date().toISOString().split('T')[0];
    // Retrieve both IDs using paramMap
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    console.log('Party ID:', this.partyID);
    console.log('paymentintype:', this.paymentintype);
      this.user_id= this.jwtService.getpanelUserId();


    
  
     
  
      this.paymentinform = this.formBuilder.group({
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
      this.employeeService.getTransactionParty(this.projectiD).subscribe((response: any) => {
        if (response.status === 200) {
          
          this.partynamelist = response.transaction_parties
        }
      });
    }

    balanceamoujnt:any
    getbalanceparty() {
      this.employeeService.getbalance(this.projectiD,this.partyid).subscribe((response: any) => {
        if (response.status === 200) {
          
          this.balanceamoujnt = response.parties

          this.paymentinform.get("Balance")?.setValue(response.parties!=undefined?response.parties.length>0?response.parties[0].balance:0:0)
        }
      });
    }

    partyid:any
    onchange(partyid:any){
      this.partyid =partyid
this.getbalanceparty()
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
    paymentintypetable: any
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

 
    
           
    
  
  
  





  

  
  
  
    showadditionalDetails = false;
    showdiscountDetails = false;
    showpaymentDetails = false;
    shownotesDetails = false;
    showreferenceDetails = false;
    showreaddmaterialDetails = false;

    toggleADetails() {
      this.showadditionalDetails = !this.showadditionalDetails;
      this.paymentinform.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.paymentinform.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.paymentinform.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.paymentinform.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.paymentinform.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.paymentinform.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.paymentinform.get('Payment')?.clearValidators();
      this.paymentinform.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.paymentinform.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.paymentinform.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.paymentinform.get('Payment')?.updateValueAndValidity();
      this.paymentinform.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.paymentinform.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.paymentinform.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.paymentinform.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.paymentinform.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.paymentinform.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.paymentinform.get('Reference')?.updateValueAndValidity();

    }
   
  
    addsubcontractoropen: boolean = false;
    transactioncreatemodal() {
      this.addsubcontractoropen = true;
    }
    closeModal() {
      this.addsubcontractoropen = false;
      this.closeModalEvent.emit();
    }
   
   
  
  
  
  
  
  
  
    resetFilter() {
      window.location.reload();
    }
  
  
  
  
  
  
    close() {
      this.closeModalEvent.emit();
    }
    @Output() closeModalEvent = new EventEmitter<void>();
    @Input() open: boolean = false;

  successName: any = "";
  errorMessage: any;
  submitted!: boolean;
  @Output() selectedIn = new EventEmitter<string>();
  erroroutput: boolean = false;
  creatpaymentouttype() {
    if (this.paymentinform.valid) {
    

      
      const formData: FormData = new FormData();

     

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.paymentinform.get("date")?.value.toString());
      formData.append("party_id", this.paymentinform.get("selectpartyname")?.value.toString());
      formData.append("amount", this.paymentinform.get("SubTotal")?.value.toString());
      formData.append("description", this.paymentinform.get("description")?.value.toString());
   
   
     
   
   
      formData.append("payment_method", this.paymentinform.get("cheque")?.value.toString());
 
  
  
     
      if (this.profileimage) {
        // If image exists, add it to FormData
      

        const file = this.profileimage;
        formData.append("image", file, file.name);
      }
  
      // Call the API service
      this.employeeService.addsubcotractorpaymenin(formData).subscribe((response: any) => {
        if (typeof response.message === 'object' && response.message !== null && !Array.isArray(response.message)) {
          this.errorMessage = JSON.stringify(response.message);
        } else {
          this.errorMessage = response.message;
        }
  
        if (response.status === 200) {
          this.closeModal();
          this.selectedIn.emit('close');
          this.successName = 'Payment In';
          this.ngOnInit();
  
          // Save profile picture URL
        
          this.clearFileWithoutevent();
  
          // Optionally display success message
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
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
      this.paymentinform.markAllAsTouched();
      this.selectedIn.emit('fill all the details Correctly');
      console.log(this.findInvalidControls(this.paymentinform));
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
