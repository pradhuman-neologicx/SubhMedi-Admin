import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';


@Component({
  selector: 'app-subcontracterpayementout',
  templateUrl: './subcontracterpayementout.component.html',
  styleUrl: './subcontracterpayementout.component.scss'
})


  export class SubcontracterpayementoutComponent {
  
    @Input() renewType!: string;
    addsubcontractorform!: FormGroup;
  
  
  
  
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
      console.log('renewType updated:', this.renewType);
      if (changes['renewType'] && changes['renewType'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when renewType updates
        console.log('renewType updated:', changes['renewType'].currentValue);
        this.initializeComponent(changes['renewType'].currentValue);
      }
    }
  
    // Initialization logic based on renewType changes
    private initializeComponent(renewTypeValue: any) {
      // Place any logic that should run when renewType changes
      console.log('Initialization logic executed with renewType:', renewTypeValue);
      // Add more initialization steps as needed
      if (renewTypeValue!='0'|| renewTypeValue !=0){
        this.Createaddsubcontractor()
      }
      
    }
  
    ngOnInit(): void {
      this.todayDate = new Date().toISOString().split('T')[0];
    // Retrieve both IDs using paramMap
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    console.log('Party ID:', this.partyID);
    console.log('renewType:', this.renewType);
      this.user_id= this.jwtService.getpanelUserId();


    
  
     
  
      this.addsubcontractorform = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
        selectpartyname: ["", [Validators.required,]],
       
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
     
  
  
      this.Getpartynamesubcontractorfun();
      this.Getunitsn();
    
   
    
  
      
  
  
  
  
  
  
  
  
    }

      // Method to remove a specific task
  removeTask(index: number) {
    this.materials.removeAt(index);
  }
 
   // Getter for FormArray
   get materials(): FormArray {
    return this.addsubcontractorform.get('materials') as FormArray;
  }
 
  
 

  // On change event for ng-select
  // onMaterialsChange(selectedMaterials: any[]) {
  //   this.materials.clear(); // Clear existing FormArray controls
  //   selectedMaterials.forEach((e:any) => {
  //     this.materials.push(this.createMaterialGroup());
  //   });
  // }

  // Create FormGroup for each material
  createMaterialGroup(): FormGroup {
    return this.formBuilder.group({
      
      name: ['', Validators.required],
      subtotal: [''],
      Unitsnew: ['', Validators.required],
      units: ['', Validators.required],
      unitsRange: ['', Validators.required]
     
    });
  }

  addTask() {
    // this.materials.push(this.createMaterialGroup());
    this.materials.insert(0, this.createMaterialGroup());
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
    Getpartynamesubcontractorfun() {
      this.employeeService.getsubcontractorParties(this.projectiD).subscribe((response: any) => {
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
   
  
    addsubcontractoropen: boolean = false;
    transactioncreatemodal() {
      this.addsubcontractoropen = true;
    }
    closeModal() {
      this.addsubcontractoropen = false;
    
    }
    toggleAMatDetails() {
      this.showreaddmaterialDetails = true
      this.materials.clear(); // Clear existing FormArray controls
      // this.materials.push(this.createMaterialGroup());
      this.addTask(); // Add an initial task
    }
 
   
  
  
  
  
  
  
  
    resetFilter() {
      window.location.reload();
    }
  
  
  
  
  
  
  
  


    
  errorMessage: any;
  submitted!: boolean;
  @Output() selectedIn = new EventEmitter<string>();
  erroroutput: boolean = false;
  Createaddsubcontractor() {
    if (this.addsubcontractorform.valid) {
    

      
      const formData: FormData = new FormData();

      var newMateria=[];
      for (let index = 0; index < this.materials.length; index++) {
        const addsubcontractorform =   this.materials.at(index);
  
    
        // Safely parse values from the form controls, defaulting to 0 if invalid or empty
        const units: number = parseFloat(addsubcontractorform.get('units')?.value ?? '0') || 0;
        const unitsRange: number = parseFloat(addsubcontractorform.get('unitsRange')?.value ?? '0') || 0;
      
        newMateria.push({
         
          "name": addsubcontractorform.get('name')?.value,
          "quantity":units.toString(),
          "unit_id":
          addsubcontractorform.get('Unitsnew')?.value.toString(),
      
          "unit_rate":unitsRange.toString()
        })
      
    }

    
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.addsubcontractorform.get("date")?.value.toString());
      formData.append("party_id", this.addsubcontractorform.get("selectpartyname")?.value.toString());
      formData.append("tasks", JSON.stringify(newMateria)); // Convert materialList to JSON string if it's an object
      formData.append("additional_charges", this.addsubcontractorform.get("additionalcharges")?.value.toString());
      formData.append("discount", this.addsubcontractorform.get("Discount")?.value.toString());
      formData.append("total_amount", this.calculateTotal().toString());
      formData.append("category", 'sub_contractor_payment');
   
      formData.append("payment_out", this.addsubcontractorform.get("Payment")?.value.toString());
      formData.append("payment_method", this.addsubcontractorform.get("cheque")?.value.toString());
      formData.append("balance", this.calculatebalanceTotal().toString());
      formData.append("notes", this.addsubcontractorform.get("Notes")?.value.toString());
      formData.append("reference_no", this.addsubcontractorform.get("Reference")?.value.toString());
      formData.append("sub_total", this.calculateSubTotal().toString());
  
     
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
      this.addsubcontractorform.markAllAsTouched();
      this.selectedIn.emit('fill all the details Correctly');
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

  }
