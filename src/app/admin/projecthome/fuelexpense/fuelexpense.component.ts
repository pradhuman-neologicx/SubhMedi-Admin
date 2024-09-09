import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from 'src/app/core/model-class/employee';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-fuelexpense',
  templateUrl: './fuelexpense.component.html',
  styleUrl: './fuelexpense.component.scss'
})



  export class FuelexpenseComponent {
  
    @Input() fueltype!: string;
    fueltypeform!: FormGroup;
    @Input() partyId!: any;
  
  
  
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
      console.log('fueltype updated:', this.fueltype);
      if (changes['fueltype'] && changes['fueltype'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when fueltype updates
        console.log('fueltype updated:', changes['fueltype'].currentValue);
        this.initializeComponent(changes['fueltype'].currentValue);
      } else if (changes['partyId'] && changes['partyId'].currentValue !== undefined) {
        // Initialization logic or any code you want to run when materialpurchase updates
        console.log('partyId updated:', changes['partyId'].currentValue);

        this.initializeComponentparty(changes['partyId'].currentValue);
      }
    }
  
    // Initialization logic based on fueltype changes
    private initializeComponent(fueltypeValue: any) {
      // Place any logic that should run when fueltype changes
      console.log('Initialization logic executed with fueltype:', fueltypeValue);
      // Add more initialization steps as needed
      if (fueltypeValue!='0'|| fueltypeValue !=0){
        console.log('Party ID:', this.partyId);
        this.Createaddotherexpense()
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
    this.partyID = this.route.snapshot.paramMap.get('party_id');
    console.log('Project ID:', this.projectID);
    console.log('Party ID:', this.partyID);
    console.log('fueltype:', this.fueltype);
      this.user_id= this.jwtService.getpanelUserId();


    
  
     
  
      this.fueltypeform = this.formBuilder.group({
        date: [this.todayDate, [Validators.required,]],
        selectpartyname: 
        this.formBuilder.control({
          value:this.partyId!=undefined?this.partyId:"",
          disabled:this.partyId!=undefined?true: false,
        } ),
        Balance: ['',],
       SubTotal: ['',Validators.required],
       cheque: ["",Validators.required],
       description: [""],
       profileimage: ['',],
     
      });
     
  
  
      this.Getpartynamesubcontractorfun();
      this.Getunitsn();
    
   
      if (this.partyId != undefined)
        {
         this.onchange(this.partyId)
        }    
       
  
      
  
  
  
  
  
  
  
  
    }

      // Method to remove a specific task
  removeTask(index: number) {
    this.materials.removeAt(index);
  }
 
   // Getter for FormArray
   get materials(): FormArray {
    return this.fueltypeform.get('materials') as FormArray;
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
      subtotal: ['', Validators.required],
  
     
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
      this.employeeService.getfuelParties(this.projectiD).subscribe((response: any) => {
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
      this.fueltypeform.get('additionalcharges')?.clearValidators();
      if(this.showpaymentDetails){
        this.fueltypeform.get('additionalcharges')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.fueltypeform.get('additionalcharges')?.updateValueAndValidity();
   
    
    }
    toggleDDetails() {
      this.showdiscountDetails = !this.showdiscountDetails;
      this.fueltypeform.get('Discount')?.clearValidators();
      if(this.showpaymentDetails){
        this.fueltypeform.get('Discount')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.fueltypeform.get('Discount')?.updateValueAndValidity();
   
    
    
    }
    togglePAYDetails() {
      this.showpaymentDetails = !this.showpaymentDetails;
      this.fueltypeform.get('Payment')?.clearValidators();
      this.fueltypeform.get('cheque')?.clearValidators();
      if(this.showpaymentDetails){
        this.fueltypeform.get('Payment')?.setValidators([
          Validators.required,
        ]);
        this.fueltypeform.get('cheque')?.setValidators([
          Validators.required,
        ]);
      }
    
      this.fueltypeform.get('Payment')?.updateValueAndValidity();
      this.fueltypeform.get('cheque')?.updateValueAndValidity();
    }
    toggleNDetails() {
      this.shownotesDetails = !this.shownotesDetails;
      this.fueltypeform.get('Notes')?.clearValidators();
      if(this.showpaymentDetails){
        this.fueltypeform.get('Notes')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.fueltypeform.get('Notes')?.updateValueAndValidity();
    }
    toggleRDetails() {
      this.showreferenceDetails = !this.showreferenceDetails;
      this.shownotesDetails = !this.shownotesDetails;
      this.fueltypeform.get('Reference')?.clearValidators();
      if(this.showpaymentDetails){
        this.fueltypeform.get('Reference')?.setValidators([
          Validators.required,
        ]);
       
      }
    
      this.fueltypeform.get('Reference')?.updateValueAndValidity();

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
  Createaddotherexpense() {
    if (this.fueltypeform.valid) {
    

      
      const formData: FormData = new FormData();

      var newMateria=[];
      for (let index = 0; index < this.materials.length; index++) {
        const fueltypeform =   this.materials.at(index);
  
    
      
        newMateria.push({
         
          "name": fueltypeform.get('name')?.value,
          "amount": fueltypeform.get('subtotal')?.value,
    
        })
      
    }
    
   
      // Append common fields
      const user = this.jwtService.getpanelUserId();
      formData.append("user_id",user.toString());
      formData.append("project_id", this.projectiD.toString());
      formData.append("date", this.fueltypeform.get("date")?.value.toString());
      formData.append("party_id", this.fueltypeform.get("selectpartyname")?.value.toString());
      formData.append("tasks", JSON.stringify(newMateria)); // Convert materialList to JSON string if it's an object
      formData.append("additional_charges", this.fueltypeform.get("additionalcharges")?.value.toString());
      formData.append("discount", this.fueltypeform.get("Discount")?.value.toString());
      formData.append("total_amount", this.calculateTotal().toString());
      formData.append("category", 'other_expense');
   
      formData.append("payment_out", this.fueltypeform.get("Payment")?.value.toString());
      formData.append("payment_method", this.fueltypeform.get("cheque")?.value.toString());
 
      formData.append("notes", this.fueltypeform.get("Notes")?.value.toString());
      formData.append("reference_no", this.fueltypeform.get("Reference")?.value.toString());
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
      this.fueltypeform.markAllAsTouched();
      this.selectedIn.emit('fill all the details Correctly');
      console.log(this.findInvalidControls(this.fueltypeform));
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
  
  balanceamoujnt:any
  getbalanceparty() {
    this.employeeService.getbalance(this.projectiD,this.partyid).subscribe((response: any) => {
      if (response.status === 200) {
        
        this.balanceamoujnt = response.parties

        this.fueltypeform.get("Balance")?.setValue(response.parties!=undefined?response.parties.length>0?response.parties[0].balance:0:0)
      }
    });
  }
  partyid:any
  onchange(partyid:any){
    this.partyid =partyid
this.getbalanceparty()
  }



  calculatebalanceTotal(): number {
    
    const totaamount = parseFloat(this.fueltypeform.get("Amount")?.value ?? '') || 0;
    const paymentout = parseFloat(this.fueltypeform.get("Payment")?.value ?? '') || 0;
  
   
    const total =  this.calculateTotal() - paymentout;
  
   
    // this.totalAmountControl.setValue(total.toString());
  
    return total;
  }
  


  calculateTotal(): number {
    
    const additionalCharge = parseFloat(this.fueltypeform.get("additionalcharges")?.value ?? '') || 0;
    const discount = parseFloat(this.fueltypeform.get("Discount")?.value ?? '') || 0;
  
   
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

    
    const fueltypeform =   this.materials.at(index);
  
    
    // Safely parse values from the form controls, defaulting to 0 if invalid or empty
    const subtotal: number = parseFloat(fueltypeform.get('subtotal')?.value ?? '0') || 0;
    // const unitsRange: number = parseFloat(fueltypeform.get('unitsRange')?.value ?? '0') || 0;
    // const discount: number = parseFloat(fueltypeform.get('discount')?.value ?? '0') || 0;

    // Perform the calculation: (qty * unitrate) - discount
     total = subtotal;
    }
    return total;
  }


catergory:any
  onchangecategory(value:any) {
  this.catergory=value
  }

  }
