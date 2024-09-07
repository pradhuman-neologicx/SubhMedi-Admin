import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-materialpurchase',
  templateUrl: './materialpurchase.component.html',
  styleUrl: './materialpurchase.component.scss'
})


  export class MaterialpurchaseComponent {
  
    @Input() materialpurchase!: string;
    @Input() partyId!: any;
    othermaterialtype!: FormGroup;
  
  
  
  
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
      console.log('materialpurchase updated:', this.materialpurchase);
      if (changes['materialpurchase'] && changes['materialpurchase'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when materialpurchase updates
        console.log('materialpurchase updated:', changes['materialpurchase'].currentValue);

        this.initializeComponent(changes['materialpurchase'].currentValue);
      } else if (changes['partyId'] && changes['partyId'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when materialpurchase updates
        console.log('partyId updated:', changes['partyId'].currentValue);

        this.initializeComponentparty(changes['partyId'].currentValue);
      }
    }
  
    // Initialization logic based on materialpurchase changes
    private initializeComponent(materialpurchaseValue: any) {
      // Place any logic that should run when materialpurchase changes
      console.log('Initialization logic executed with materialpurchase:', materialpurchaseValue);
      // Add more initialization steps as needed
      if (materialpurchaseValue!='0'|| materialpurchaseValue !=0){
        console.log('Party ID:', this.partyId);
        this.creatematerialpurchase()
      }
      
    }
    private initializeComponentparty(partyId: any) {
      // Place any logic that should run when materialpurchase changes
      console.log('Initialization logic executed with partyId:', partyId);
      // Add more initialization steps as needed
      if (partyId!='0'|| partyId !=0){
        console.log('Party ID:', this.partyId);
        // this.creatematerialpurchase()
      }
      
    }
  
    ngOnInit(): void {
      this.todayDate = new Date().toISOString().split('T')[0];
    // Retrieve both IDs using paramMap
    this.projectID = this.route.snapshot.paramMap.get('id');
    // this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    // console.log('Party ID:', this.partyID);
    console.log('Party ID:', this.partyId);
    console.log('materialpurchase:', this.materialpurchase);
      this.user_id= this.jwtService.getpanelUserId();


    
  
     
  
      this.othermaterialtype = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
        selectpartyname: 
          this.formBuilder.control({
            value:this.partyId!=undefined?this.partyId:"",
            disabled:this.partyId!=undefined?true: false,
          } , [Validators.required,])
         ,
       SubTotal: ['',Validators.required],
       cheque: ["",Validators.required],
       description: [""],
       profileimage: ['',],
       Balance: ['',],
      
     
      
       
      
     
 
      
     
      });
     
  
  
      this.Getpartynamesubcontractorfun();
      this.Getunitsn();
    
   if (this.partyId != undefined)
   {
    this.onchange(this.partyId)
   }    
  
      
  
  
  
  
  
  
  
  
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
      this.employeeService.GetpartynamelistApi().subscribe((response: any) => {
        if (response.status === 200) {
          
          this.partynamelist = response.suppliers
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

 
    
           
    
  
  
  





  

  
  
  
    showadditionalDetails = false;
    showdiscountDetails = false;
    showpaymentDetails = false;
    shownotesDetails = false;
    showreferenceDetails = false;
    showreaddmaterialDetails = false;

    toggleADetails() {
      this.showadditionalDetails = !this.showadditionalDetails;
      this.othermaterialtype.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.othermaterialtype.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.othermaterialtype.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.othermaterialtype.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.othermaterialtype.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.othermaterialtype.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.othermaterialtype.get('Payment')?.clearValidators();
      this.othermaterialtype.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.othermaterialtype.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.othermaterialtype.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.othermaterialtype.get('Payment')?.updateValueAndValidity();
      this.othermaterialtype.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.othermaterialtype.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.othermaterialtype.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.othermaterialtype.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.othermaterialtype.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.othermaterialtype.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.othermaterialtype.get('Reference')?.updateValueAndValidity();

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
  creatematerialpurchase() {
    if (this.othermaterialtype.valid) {
    

      
      const formData: FormData = new FormData();

     

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.othermaterialtype.get("date")?.value.toString());
      formData.append("party_id", this.othermaterialtype.get("selectpartyname")?.value.toString());
      formData.append("amount", this.othermaterialtype.get("SubTotal")?.value.toString());
      formData.append("description", this.othermaterialtype.get("description")?.value.toString());
   
   
      formData.append("category", 'material_purchase');
   
   
      formData.append("payment_method", this.othermaterialtype.get("cheque")?.value.toString());
 
  
  
     
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
      this.othermaterialtype.markAllAsTouched();
      this.selectedIn.emit('fill all the details Correctly');
      console.log(this.findInvalidControls(this.othermaterialtype));
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

  balanceamoujnt:any
  getbalanceparty() {
    this.employeeService.getbalance(this.projectiD,this.partyid).subscribe((response: any) => {
      if (response.status === 200) {
        
        this.balanceamoujnt = response.parties

        this.othermaterialtype.get("Balance")?.setValue(response.parties!=undefined?response.parties.length>0?response.parties[0].balance:0:0)
      }
    });
  }
  partyid:any
  onchange(partyid:any){
    this.partyid =partyid
this.getbalanceparty()
  }



  }

