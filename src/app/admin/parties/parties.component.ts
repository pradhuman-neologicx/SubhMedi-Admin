import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Createparty } from 'src/app/core/model-class/parties';
import { Validations } from 'src/app/core/model-class/validations';
import { CourseService } from 'src/app/core/services/course.service';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss',
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

export class PartiesComponent {
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
  ) { }
  validation: Validations = new Validations();
  sessionId: any;
  searchbarform!: FormGroup;
  FilterForm!: FormGroup;
  Token!: String;
  ngOnInit(): void {
    this.Token = this.jwtService.getToken();
    this.sessionId = this.jwtService.getSession();
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });
    this.FilterForm = this.formBuilder.group({
      SelectCurrentStatus: [''],
      SelectBatch: [''],
    });
    this.CreatepartyForm = this.formBuilder.group({
      PartyName: ["", [Validators.required,]],
      PartyType: ["", [Validators.required,]],
      PhoneNumber: ["",Validators.pattern(this.validation.mobile_pattern),],
      Email: ["",],
      GSTNumber: ["",],
      LegalBusinessName: ["",],
      State: [""],
      partypayement: [""],
      partyamount: [""],
      BillingAddress: [""],
      AccountholderName: [""],
      AccountNumber: [""],
      IFSCCode: [""],
      BankName: [""],
      IBANNumber: [""],
      BankAddress: [""],
      UPI: [""],
    });


    this.Getpartytablefun();
    this.getState();
    this.GetPartyType();
  }
  // StudentTable: any;
  // type:any;
  // showStudent: any;
  // searchText: any;
  // tableSize: any = 10;
  // tableSizes: any = [10, 20, 50, 100, 'all'];
  // totalRecords: any;
  // page: number = 1;
  // getstudentsfunpagination(type: any) {
  //   this.type=type;
  //   if (this.tableSize != "all") {
  //     this.courseService.Getstudentpagination(
  //       this.sessionId,
  //       this.FilterForm.get('SelectCurrentStatus')?.value,
  //       this.FilterForm.get('SelectBatch')?.value, this.tableSize, this.page
  //     ).subscribe((response: any) => {
  //       if (type == 1) {
  //         this.showStudent = true;
  //       }
  //       this.totalRecords = response.data.total;
  //       this.StudentTable = response.data.students;
  //     });
  //   }
  //   else {
  //     this.getstudentsfun(type);
  //   }
  // }


  // getstudentsfun(type: any) {
  //   this.showreset = false;
  //   this.searchbarform.get("searchbar")?.setValue("");
  //   this.searchbarform.markAsUntouched();


  //   this.type=type;
  //   this.courseService.Getstudenttts(
  //     this.sessionId,
  //     this.FilterForm.get('SelectCurrentStatus')?.value,
  //     this.FilterForm.get('SelectBatch')?.value
  //   ).subscribe((response: any) => {

  //     if (type == 1) {
  //       this.showStudent = true;
  //     }
  //     this.totalRecords = response.data.total;
  //     this.StudentTable = response.data.students;
  //   });
  // }

  showreset: any = false

  resetsearchbar() {
    window.location.reload();
  }


  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   console.log(event.target.value);
  //   this.page = 1;
  //   if (this.searchbarform.valid && this.showreset==true) {
  //     this.searchfun()
  //   }else{
  //     this.getstudentsfunpagination(this.type);
  //   }

  // }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   if (this.searchbarform.valid && this.showreset==true) {
  //     this.searchfun()
  //   }else{
  //     this.getstudentsfunpagination(this.type);
  //   }
  // }

  // searchfun() {
  //   if (this.searchbarform.valid) {
  //     this.showreset = true;
  //     this.courseService.Getstudentsearch (
  //       this.sessionId,
  //       this.FilterForm.get('SelectCurrentStatus')?.value,
  //       this.FilterForm.get('SelectBatch')?.value, this.tableSize, this.page,
  //       this.searchbarform.get("searchbar")?.value)
  //       .subscribe((response: any) => {
  //         this.totalRecords = response.data.total;
  //         this.StudentTable = response.data.students;
  //       });
  //   }
  //   else {
  //     this.searchbarform.markAllAsTouched();
  //   }
  // }

  partiestable: any;

  // Getpartytablefun() {
  //   this.courseService.GetpartytableApi().subscribe((response: any) => {
  //       if (response.status === 200) {
  //         this.partiestable = response.parties;
  //       } else {
  //         // Handle other status codes or errors here
  //         console.error('Failed to retrieve party table data. Status:', response.status);
  //       }
  //     }, (error) => {
  //       // Handle HTTP errors that prevent the request from succeeding
  //       console.error('An error occurred:', error);
  //     });
  // }


  Getpartytablefun() {
    this.courseService.GetpartytableApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.partiestable = response.parties;
      }
    });
  }
  CreatepartyForm!: FormGroup;
  Createpartyopen: boolean = false;
  OpenCreateModal() {
    this.Createpartyopen = true;
  }
  closeModal() {
    this.Createpartyopen = false;
  }

  submitted: any;
  errorMessage: any;

  Createparty: Createparty = new Createparty();


  PartTypeList: any;
  GetPartyType() {
    this.courseService.GetpartyTypetableApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.PartTypeList = response.party_types;
      }
      console.log(this.PartTypeList);
    });
  }
  partyTypeName: any
  staffselect(value: any) {
    var newlist = this.PartTypeList.filter((courseType: any) => courseType.id == value);

    console.log(newlist);
    if (newlist.length > 0) {
      this.partyTypeName = newlist[0].name;
      this.updateEmailValidators();
    }
  }

  updateEmailValidators() {


    if (this.partyTypeName === 'staff') {
      this.CreatepartyForm.get('Email')?.setValidators([Validators.required,Validators.pattern(this.validation.email_pattern),]);

    } else {
      this.CreatepartyForm.get('Email')?.clearValidators();

    }

    this.CreatepartyForm.get('Email')?.updateValueAndValidity();
  }




  showGstDetails = false;
  toggleGstDetails(): void {
    this.showGstDetails = !this.showGstDetails;

    if (this.showGstDetails) {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
      // Add required validators
      this.CreatepartyForm.get('GSTNumber')?.setValidators([Validators.required,Validators.pattern(gstPattern)]);
      this.CreatepartyForm.get('LegalBusinessName')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('State')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('BillingAddress')?.setValidators([Validators.required]);
    } else {
      // Remove validators
      this.CreatepartyForm.get('GSTNumber')?.clearValidators();
      this.CreatepartyForm.get('LegalBusinessName')?.clearValidators();
      this.CreatepartyForm.get('State')?.clearValidators();
      this.CreatepartyForm.get('BillingAddress')?.clearValidators();
    }

    // Update the form to revalidate fields
    this.CreatepartyForm.get('GSTNumber')?.updateValueAndValidity();
    this.CreatepartyForm.get('LegalBusinessName')?.updateValueAndValidity();
    this.CreatepartyForm.get('State')?.updateValueAndValidity();
    this.CreatepartyForm.get('BillingAddress')?.updateValueAndValidity();
  }

  showopeningDetails = false;
  toggleopeningbalance() {
    this.showopeningDetails = !this.showopeningDetails;
    
    if (this.showopeningDetails) {

      // Add required validators
      this.CreatepartyForm.get('partypayement')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('partyamount')?.setValidators([Validators.required]);
    } else {
      // Remove validators
      this.CreatepartyForm.get('partypayement')?.clearValidators();
      this.CreatepartyForm.get('partyamount')?.clearValidators();
    }

    // Update the form to revalidate fields
    this.CreatepartyForm.get('partypayement')?.updateValueAndValidity();
    this.CreatepartyForm.get('partyamount')?.updateValueAndValidity();

  }

  showbankdetails = false;
  togglebankdetails(): void {
    this.showbankdetails = !this.showbankdetails;

    if (this.showbankdetails) {
      const IFSCCodePattern = /^[A-Z]{4}[0-9]{7}$/;  
      const AccountNumberPattern = /^[0-9]{9,18}$/; // Pattern for Account Number    

      // Add required validators
      this.CreatepartyForm.get('AccountholderName')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('AccountNumber')?.setValidators([Validators.required,Validators.pattern(AccountNumberPattern)]);
      this.CreatepartyForm.get('IFSCCode')?.setValidators([Validators.required,Validators.pattern(IFSCCodePattern)]);
      this.CreatepartyForm.get('BankName')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('BankAddress')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('IBANNumber')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('UPI')?.setValidators([Validators.required]);
    } else {
      // Remove validators
      this.CreatepartyForm.get('AccountholderName')?.clearValidators();
      this.CreatepartyForm.get('AccountNumber')?.clearValidators();
      this.CreatepartyForm.get('IFSCCode')?.clearValidators();
      this.CreatepartyForm.get('BankName')?.clearValidators();
      this.CreatepartyForm.get('BankAddress')?.clearValidators();
      this.CreatepartyForm.get('IBANNumber')?.clearValidators();
      this.CreatepartyForm.get('UPI')?.clearValidators();
    }

    // Update the form to revalidate fields
    this.CreatepartyForm.get('AccountholderName')?.updateValueAndValidity();
    this.CreatepartyForm.get('AccountNumber')?.updateValueAndValidity();
    this.CreatepartyForm.get('IFSCCode')?.updateValueAndValidity();
    this.CreatepartyForm.get('BankName')?.updateValueAndValidity();
    this.CreatepartyForm.get('BankAddress')?.updateValueAndValidity();
    this.CreatepartyForm.get('IBANNumber')?.updateValueAndValidity();
    this.CreatepartyForm.get('UPI')?.updateValueAndValidity();
  }



  getState() {
    this.employeeService.GetState().subscribe((response: any) => {
      if (response.status === 200) {
        this.stateList = response.data;
      } else {
        console.error('Failed to load states', response);
      }
    });
  }
  stateList: any = [];
  citiesList: any = [];
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
  successName: any = "";
  openSecondsuccess = false;
  CratenewPartyFun() {
    if (this.CreatepartyForm.valid) {
      var gst_details = [];
      if (this.CreatepartyForm.get('LegalBusinessName')?.value != undefined
        && this.CreatepartyForm.get('BillingAddress')?.value != undefined
        && this.CreatepartyForm.get('State')?.value != undefined
        && this.CreatepartyForm.get('GSTNumber')?.value != undefined) {
          if (this.CreatepartyForm.get('LegalBusinessName')?.value.length>0
          && this.CreatepartyForm.get('BillingAddress')?.value.length>0
          && this.CreatepartyForm.get('State')?.value.length>0
          && this.CreatepartyForm.get('GSTNumber')?.value.length>0) {
        gst_details.push({
          "business_name": this.CreatepartyForm.get('LegalBusinessName')?.value,
          "billing_address": this.CreatepartyForm.get('BillingAddress')?.value,
          "state_id": this.CreatepartyForm.get('State')?.value,
          "gst_number": this.CreatepartyForm.get('GSTNumber')?.value,
        })
      }
    }

      var opening_balance = [];


      if (this.CreatepartyForm.get('partypayement')?.value != undefined
        && this.CreatepartyForm.get('partypayement')?.value != undefined
        && this.CreatepartyForm.get('partyamount')?.value != undefined) {
          if (this.CreatepartyForm.get('partypayement')?.value.length>0
        && this.CreatepartyForm.get('partypayement')?.value.length>0
        && this.CreatepartyForm.get('partyamount')?.value.length>0) {
        opening_balance.push({
          "will_pay": this.CreatepartyForm.get('partypayement')?.value == true ? true : false,
          "will_receive": this.CreatepartyForm.get('partypayement')?.value == false ? true : false,
          "amount": this.CreatepartyForm.get('partyamount')?.value,
        })
      }
    }

      var bank_details = [];
      if (this.CreatepartyForm.get('AccountholderName')?.value != undefined
        && this.CreatepartyForm.get('BankName')?.value != undefined
        && this.CreatepartyForm.get('IFSCCode')?.value != undefined
        && this.CreatepartyForm.get('AccountNumber')?.value != undefined
        && this.CreatepartyForm.get('BankAddress')?.value != undefined
        && this.CreatepartyForm.get('IBANNumber')?.value != undefined
        && this.CreatepartyForm.get('UPI')?.value != undefined
      ) {
        if (this.CreatepartyForm.get('AccountholderName')?.value.lenght>0
        && this.CreatepartyForm.get('BankName')?.value.lenght>0
        && this.CreatepartyForm.get('IFSCCode')?.value.lenght>0
        && this.CreatepartyForm.get('AccountNumber')?.value.lenght>0
        && this.CreatepartyForm.get('BankAddress')?.value.lenght>0
        && this.CreatepartyForm.get('IBANNumber')?.value.lenght>0
        && this.CreatepartyForm.get('UPI')?.value.lenght>0
      ) {
        bank_details.push({
          "account_holder_name": this.CreatepartyForm.get('AccountholderName')?.value,
          "bank_name": this.CreatepartyForm.get('BankName')?.value,
          "ifsc_code": this.CreatepartyForm.get('IFSCCode')?.value,
          "account_no": this.CreatepartyForm.get('AccountNumber')?.value,
          "bank_address": this.CreatepartyForm.get('BankAddress')?.value,
          "iban_no": this.CreatepartyForm.get('IBANNumber')?.value,
          "upi_id": this.CreatepartyForm.get('UPI')?.value,
        })
      }
    }
      // var body =
      // {
      //   "name": this.CreatepartyForm.get('PartyName')?.value,
      //   "type_id": this.CreatepartyForm.get('PartyType')?.value,
      //   "email": this.CreatepartyForm.get('Email')?.value,
      //   "mobile": this.CreatepartyForm.get('PhoneNumber')?.value,
      //   "opening_balance": opening_balance,
      //   "gst_details": gstdetails, 
      //   if(bank_details.length>0){
      //     "bank_details": bank_details,
      //   }

      // };
      this.Createparty.name = this.CreatepartyForm.get('PartyName')?.value
      this.Createparty.type_id = this.CreatepartyForm.get('PartyType')?.value
      this.Createparty.email = this.CreatepartyForm.get('Email')?.value
      this.Createparty.mobile = this.CreatepartyForm.get('PhoneNumber')?.value
      if (gst_details.length > 0) {
        this.Createparty.gst_details = gst_details;

      }

      if (opening_balance.length > 0) {
        this.Createparty.opening_balance = opening_balance;

      }
      if (bank_details.length > 0) {
        this.Createparty.bank_details = bank_details;

      }
      const body = JSON.stringify(this.Createparty);
      console.log(body);
      this.courseService.createPartyApi(body).subscribe((response: any) => {
        if (typeof response.message === 'object' && response.message !== null && !Array.isArray(response.message))
       { this.errorMessage = JSON.stringify(response.message);}else {
        this.errorMessage = response.message;
       }
        console.log(response);
        if (response.status === 200) {
          console.log("success");
          this.closeModal();
          this.successName = 'Party Create';
          this.ngOnInit();
          this.Getpartytablefun;
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);

        }

      });
    }
    else {
      this.errorMessage = 'fill all the details Correctly';
      this.CreatepartyForm.markAllAsTouched();
    }
  }

}


