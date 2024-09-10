import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Createparty, Updateparty } from 'src/app/core/model-class/parties';
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
    private router: Router
  ) { }
  validation: Validations = new Validations();
  sessionId: any;
  searchbarform!: FormGroup;
  FilterForm!: FormGroup;
  Token!: String;
  userId: any;

  ngOnInit(): void {
    this.userId = this.jwtService.getpanelUserId();
    this.Token = this.jwtService.getToken();
    this.sessionId = this.jwtService.getSession();
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });
    this.FilterForm = this.formBuilder.group({
      filter: [''],
      Paymenttype: [''],
      Partytype: [''],
    
    });

    this.CreatepartyForm = this.formBuilder.group({
      PartyName: ["", [Validators.required,]],
      PartyType: ["", [Validators.required,]],
      monthlysalary: ["", [Validators.required,]],
      PhoneNumber: ["", Validators.pattern(this.validation.mobile_pattern),],
      Email: ["",],
      GSTNumber: ["",],
      LegalBusinessName: ["",],
      State: [""],
      partypayement: [true, ""],
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
    this.UpdatepartyForm = this.formBuilder.group({
      status: [true],
      PartyName: ["", [Validators.required,]],
      PartyType: ["", [Validators.required,]],
      PhoneNumber: ["", Validators.pattern(this.validation.mobile_pattern),],
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
 this.Type =  this.jwtService.getType();

    this.Getpartytablefun(0);
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
  viewmmodal(id: any,partyname:any) {
    // Log the project_id to the console
    console.log('party ID:', id);
    
    // Navigate to the desired route with the project_id
    this.router.navigate(['/viewparties', id ], {
      queryParams: { partyname: partyname },
    }); 
  }


  resetFilter() {
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

   onchange(id:any) {
    this.party_type =id;
   }
   onchangepaymenttype(id:any) {
    this.payment_type =id;
   }
  party_type:any
  payment_type:any
  
  Getpartytablefun(type: any) {
    // Check if the type is 0 or any other condition you want to handle
    if (type === 0) {
      // Fetch party data based on type 0
      this.courseService.GetpartytableApi(this.FilterForm.get('Partytype')?.value,this.FilterForm.get('Paymenttype')?.value,this.FilterForm.get('filter')?.value ?? "",).subscribe(
        (response: any) => {
          if (response.status === 200) {
            // Handle response data
            this.partiestable = response.parties;
          }
        },
        (error: any) => {
          console.error('Error fetching party data:', error);
          // Handle the error scenario
        }
      );
    } else {
      // Ensure form validation if applicable
      if (this.FilterForm.valid) {
        this.courseService.GetpartytableApi(this.FilterForm.get('Partytype')?.value,this.FilterForm.get('Paymenttype')?.value,this.FilterForm.get('filter')?.value ?? "",).subscribe(
          (response: any) => {
            if (response.status === 200) {
              // Handle response data
              this.partiestable = response.parties;
            }
          },
          (error: any) => {
            console.error('Error fetching party data:', error);
            // Handle the error scenario
          }
        );
      } else {
        // Mark form fields as touched to display validation errors
        this.FilterForm.markAllAsTouched();
      }
    }
  }
  
  // Getpartytablefun() {
  //   this.courseService.GetpartytableApi().subscribe((response: any) => {
  //     if (response.status === 200) {
  //       this.partiestable = response.parties;
  //     }
  //   });
  // }
  CreatepartyForm!: FormGroup;
  Createpartyopen: boolean = false;

  OpenCreateModal() {
    this.Createpartyopen = true;
  }
  closeModal() {
    this.Createpartyopen = false;
    this.Editpartyopen = false;
  }

  submitted: any;
  errorMessage: any;

  Createparty: Createparty = new Createparty();
  Updateparty: Updateparty = new Updateparty();


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
  partyTypeNameupdate: any;
  staffselect(value: any) {
    var newlist = this.PartTypeList.filter((courseType: any) => courseType.id == value);

    console.log(newlist);
    if (newlist.length > 0) {
      this.partyTypeName = newlist[0].name;
      this.updateEmailValidators();
    }
  }

  updateEmailValidators() {

    if (this.partyTypeName === 'supervisor') {
      this.CreatepartyForm.get('Email')?.setValidators([Validators.required, Validators.pattern(this.validation.email_pattern),]);
      this.CreatepartyForm.get('monthlysalary')?.setValidators([Validators.required]);

    } else {
      this.CreatepartyForm.get('Email')?.clearValidators();
      this.CreatepartyForm.get('monthlysalary')?.clearValidators();

    }

    this.CreatepartyForm.get('Email')?.updateValueAndValidity();
    this.CreatepartyForm.get('monthlysalary')?.updateValueAndValidity();
  }




  showGstDetails = false;
  toggleGstDetails(): void {
    this.CreatepartyForm.get('GSTNumber')?.clearValidators();
    this.CreatepartyForm.get('LegalBusinessName')?.clearValidators();
    this.CreatepartyForm.get('State')?.clearValidators();
    this.CreatepartyForm.get('BillingAddress')?.clearValidators();
    this.showGstDetails = !this.showGstDetails;

    if (this.showGstDetails == true) {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
      // Add required validators
      this.CreatepartyForm.get('GSTNumber')?.setValidators([Validators.required, Validators.pattern(gstPattern)]);
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
    this.CreatepartyForm.get('partypayement')?.clearValidators();
    this.CreatepartyForm.get('partyamount')?.clearValidators();
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
    this.CreatepartyForm.get('AccountholderName')?.clearValidators();
    this.CreatepartyForm.get('AccountNumber')?.clearValidators();
    this.CreatepartyForm.get('IFSCCode')?.clearValidators();
    this.CreatepartyForm.get('BankName')?.clearValidators();
    this.CreatepartyForm.get('BankAddress')?.clearValidators();
    this.CreatepartyForm.get('IBANNumber')?.clearValidators();
    this.CreatepartyForm.get('UPI')?.clearValidators();
    if (this.showbankdetails) {
      const IFSCCodePattern = /^[A-Z]{4}[0-9]{7}$/;
      const AccountNumberPattern = /^[0-9]{9,18}$/; // Pattern for Account Number    

      // Add required validators
      this.CreatepartyForm.get('AccountholderName')?.setValidators([Validators.required]);
      this.CreatepartyForm.get('AccountNumber')?.setValidators([Validators.required, Validators.pattern(AccountNumberPattern)]);
      this.CreatepartyForm.get('IFSCCode')?.setValidators([Validators.required, Validators.pattern(IFSCCodePattern)]);
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
      let gst_details = [];
      let opening_balance = [];
      let bank_details = [];

      // const gstFilled = this.CreatepartyForm.get('LegalBusinessName')?.value?.length > 0
      //   || this.CreatepartyForm.get('BillingAddress')?.value?.length > 0
      //   || this.CreatepartyForm.get('State')?.value?.length > 0
      //   || this.CreatepartyForm.get('GSTNumber')?.value?.length > 0;

      // const openingBalanceFilled = this.CreatepartyForm.get('partyamount')?.value?.length > 0;

      // const bankDetailsFilled = this.CreatepartyForm.get('AccountholderName')?.value?.length > 0
      //   || this.CreatepartyForm.get('BankName')?.value?.length > 0
      //   || this.CreatepartyForm.get('IFSCCode')?.value?.length > 0
      //   || this.CreatepartyForm.get('AccountNumber')?.value?.length > 0
      //   || this.CreatepartyForm.get('BankAddress')?.value?.length > 0
      //   || this.CreatepartyForm.get('IBANNumber')?.value?.length > 0
      //   || this.CreatepartyForm.get('UPI')?.value?.length > 0;
      if (this.showGstDetails) {
        gst_details.push({
          "business_name": this.CreatepartyForm.get('LegalBusinessName')?.value,
          "billing_address": this.CreatepartyForm.get('BillingAddress')?.value,
          "state_id": this.CreatepartyForm.get('State')?.value,
          "gst_number": this.CreatepartyForm.get('GSTNumber')?.value,
        });
      }



      if (this.showopeningDetails) {
        opening_balance.push({
          "will_pay": this.CreatepartyForm.get('partypayement')?.value === true,
          "will_receive": this.CreatepartyForm.get('partypayement')?.value === false,
          "amount": this.CreatepartyForm.get('partyamount')?.value,
        });
      }


      // if (bankDetailsFilled) {
      //   if (!this.CreatepartyForm.get('AccountholderName')?.value?.length
      //     || !this.CreatepartyForm.get('BankName')?.value?.length
      //     || !this.CreatepartyForm.get('IFSCCode')?.value?.length
      //     || !this.CreatepartyForm.get('AccountNumber')?.value?.length
      //     || !this.CreatepartyForm.get('BankAddress')?.value?.length
      //     || !this.CreatepartyForm.get('IBANNumber')?.value?.length
      //     || !this.CreatepartyForm.get('UPI')?.value?.length) {
      //     this.errorMessage = 'Please complete all required Bank details.';
      //     return;
      //   } else {

      if (this.showbankdetails) {
        bank_details.push({
          "account_holder_name": this.CreatepartyForm.get('AccountholderName')?.value,
          "bank_name": this.CreatepartyForm.get('BankName')?.value,
          "ifsc_code": this.CreatepartyForm.get('IFSCCode')?.value,
          "account_no": this.CreatepartyForm.get('AccountNumber')?.value,
          "bank_address": this.CreatepartyForm.get('BankAddress')?.value,
          "iban_no": this.CreatepartyForm.get('IBANNumber')?.value,
          "upi_id": this.CreatepartyForm.get('UPI')?.value,
        });
      }
      // }
      // }

      this.Createparty.name = this.CreatepartyForm.get('PartyName')?.value;
      this.Createparty.type_id = this.CreatepartyForm.get('PartyType')?.value;
      this.Createparty.email = this.CreatepartyForm.get('Email')?.value;
      this.Createparty.mobile = this.CreatepartyForm.get('PhoneNumber')?.value;
      this.Createparty.monthly_salary  = this.CreatepartyForm.get('monthlysalary')?.value;

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
      console.log("check", body);

      this.courseService.createPartyApi(body).subscribe((response: any) => {
        if (typeof response.message === 'object' && response.message !== null && !Array.isArray(response.message)) {
          this.errorMessage = JSON.stringify(response.message);
        } else {
          this.errorMessage = response.message;
        }
        console.log(response);

        if (response.status === 200) {
          console.log("success");
          this.closeModal();
          this.successName = 'Party Created';
          this.ngOnInit();
          this.Getpartytablefun(0);
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
    } else {
      this.errorMessage = 'Please fill all the details correctly.';
      this.CreatepartyForm.markAllAsTouched();
    }
  }





  // edit party 
  PartyId!: number;
  Type!: any;
  Editpartyopen: boolean = false;


  UpdatepartyForm!: FormGroup;
  OpenEditModal(party: any): void {
    this.PartyId = party.id;

    try {
      if (!party || !party.id) {
        console.error('User ID is undefined or null.');
        return;
      }

      this.Editpartyopen = true;
      this.showGstDetailsUpdate=false;
      this.showopeningDetailsUpdate=false;
      this.showbankdetailsUpdate=false;
      this.GetPartyByIdFun(party.type);


    } catch (error) {
      console.error('An error occurred while opening edit modal:', error);

    }
  }

  partlist: any;
  GetPartyByIdFun(partytype: any) {
    this.courseService.getPartyByIdAPI(this.PartyId).subscribe((response: any) => {
      if (response.status === 200) {
        this.partlist = response.data;
        this.fillformdate(response.data, partytype);

      }
      console.log(this.partlist);
    });
  }
  fillformdate(response: any, partytype: any) {
    this.partyTypeNameupdate = partytype;
    this.UpdatepartyForm = this.formBuilder.group({
      status: [response.is_active == 1 ? true : false, [Validators.required,]],
      PartyName: [response.name, [Validators.required,]],
      PartyType: [partytype, [Validators.required,]],
      PhoneNumber: [response.mobile, Validators.pattern(this.validation.mobile_pattern),],
      Email: [response.email!=null?response.email ?? "":""],
      GSTNumber:         [response.gst_details!=null?response.gst_details[0]?.gst_number!=null?response.gst_details[0]?.gst_number?? "":"":""],
      LegalBusinessName: [response.gst_details!=null?response.gst_details[0]?.business_name!=null?response.gst_details[0]?.business_name?? "":"":""],           
      State:             [response.gst_details!=null?response.gst_details[0]?.state_id!=null?response.gst_details[0]?.state_id?? "":"":""],
      BillingAddress: [response.gst_details!=null?response.gst_details[0]?.billing_address!=null?response.gst_details[0]?.billing_address?? "":"":""], 
      partypayement: [response.opening_balance!=null?response.opening_balance[0]?.will_receive!=null?response.opening_balance[0]?.will_receive== true ? false : true:"":""],
      partyamount: [response.opening_balance!=null?response.opening_balance[0]?.amount!=null?response.opening_balance[0]?.amount?? "":"":""],

      AccountholderName:[response.bank_details!=null?response.bank_details[0]?.account_holder_name!=null?response.bank_details[0]?.account_holder_name?? "":"":""],
      AccountNumber:[response.bank_details!=null?response.bank_details[0]?.account_no!=null?response.bank_details[0]?.account_no?? "":"":""],
      IFSCCode:[response.bank_details!=null?response.bank_details[0]?.ifsc_code!=null?response.bank_details[0]?.ifsc_code?? "":"":""],
      BankName: [response.bank_details!=null?response.bank_details[0]?.bank_name!=null?response.bank_details[0]?.bank_name?? "":"":""],
      BankAddress:[response.bank_details!=null?response.bank_details[0]?.bank_address!=null?response.bank_details[0]?.bank_address?? "":"":""],
      IBANNumber: [response.bank_details!=null?response.bank_details[0]?.iban_no!=null?response.bank_details[0]?.iban_no?? "":"":""],
      UPI: [response.bank_details!=null?response.bank_details[0]?.upi_id!=null?response.bank_details[0]?.upi_id?? "":"":""],
    });

    if (String(this.UpdatepartyForm.get('LegalBusinessName')?.value??"").length>0 ||
    String(this.UpdatepartyForm.get('BillingAddress')?.value??"").length>0 ||
      String(this.UpdatepartyForm.get('State')?.value??"").length>0 ||
      String(this.UpdatepartyForm.get('GSTNumber')?.value??"").length>0) {
      this.showGstDetailsUpdate = true;
      this.applyGstValidators();
    }

    // Check and prepare Opening Balance details
    if (this.UpdatepartyForm.get('partyamount')?.value) {
      this.showopeningDetailsUpdate = true;
      this.applyopeningdetialValidators();
    }

    // Check and prepare Bank details
    if (this.UpdatepartyForm.get('AccountholderName')?.value ||
      this.UpdatepartyForm.get('BankName')?.value ||
      this.UpdatepartyForm.get('IFSCCode')?.value ||
      this.UpdatepartyForm.get('AccountNumber')?.value ||
      this.UpdatepartyForm.get('BankAddress')?.value ||
      this.UpdatepartyForm.get('IBANNumber')?.value ||
      this.UpdatepartyForm.get('UPI')?.value) {
      this.showbankdetails = true;
      this.applyBankValidators();
    }
  }




  UpdatePartyFun() {
    if (this.UpdatepartyForm.valid) {
      let gst_details: any[] = [];
      let opening_balance: any[] = [];
      let bank_details: any[] = [];

      // Check and prepare GST details
      if (this.UpdatepartyForm.get('LegalBusinessName')?.value ||
        this.UpdatepartyForm.get('BillingAddress')?.value ||
        this.UpdatepartyForm.get('State')?.value ||
        this.UpdatepartyForm.get('GSTNumber')?.value) {
        gst_details.push({
          "business_name": this.UpdatepartyForm.get('LegalBusinessName')?.value || "",
          "billing_address": this.UpdatepartyForm.get('BillingAddress')?.value || "",
          "state_id": this.UpdatepartyForm.get('State')?.value || "",
          "gst_number": this.UpdatepartyForm.get('GSTNumber')?.value || ""
        });
      }

      // Check and prepare Opening Balance details
      if (this.UpdatepartyForm.get('partyamount')?.value) {
        opening_balance.push({
          "will_pay": this.UpdatepartyForm.get('partypayement')?.value === true ? true : false,
          "will_receive": this.UpdatepartyForm.get('partypayement')?.value === false ? true : false,
          "amount": this.UpdatepartyForm.get('partyamount')?.value || ""
        });
      }

      // Check and prepare Bank details
      if (this.UpdatepartyForm.get('AccountholderName')?.value ||
        this.UpdatepartyForm.get('BankName')?.value ||
        this.UpdatepartyForm.get('IFSCCode')?.value ||
        this.UpdatepartyForm.get('AccountNumber')?.value ||
        this.UpdatepartyForm.get('BankAddress')?.value ||
        this.UpdatepartyForm.get('IBANNumber')?.value ||
        this.UpdatepartyForm.get('UPI')?.value) {
        bank_details.push({
          "account_holder_name": this.UpdatepartyForm.get('AccountholderName')?.value || "",
          "bank_name": this.UpdatepartyForm.get('BankName')?.value || "",
          "ifsc_code": this.UpdatepartyForm.get('IFSCCode')?.value || "",
          "account_no": this.UpdatepartyForm.get('AccountNumber')?.value || "",
          "bank_address": this.UpdatepartyForm.get('BankAddress')?.value || "",
          "iban_no": this.UpdatepartyForm.get('IBANNumber')?.value || "",
          "upi_id": this.UpdatepartyForm.get('UPI')?.value || ""
        });
      }

      // Prepare the update payload
      this.Updateparty.party_id = this.PartyId;
      this.Updateparty.user_id = this.userId;
      this.Updateparty.name = this.UpdatepartyForm.get('PartyName')?.value;
      // this.Updateparty.type_id = this.UpdatepartyForm.get('PartyType')?.value;
      // this.Updateparty.email = this.UpdatepartyForm.get('Email')?.value;
      this.Updateparty.is_active = this.UpdatepartyForm.get('status')?.value;
      this.Updateparty.mobile = this.UpdatepartyForm.get('PhoneNumber')?.value;

      // Conditionally add optional details to the payload
      if (gst_details.length > 0) {
        this.Updateparty.gst_details = gst_details;
      }

      if (opening_balance.length > 0) {
        this.Updateparty.opening_balance = opening_balance;
      }

      if (bank_details.length > 0) {
        this.Updateparty.bank_details = bank_details;
      }

      const body = JSON.stringify(this.Updateparty);
      console.log(body);

      // Call API to update the party
      this.courseService.UpdatePartyApi(body).subscribe((response: any) => {
        if (response.status === 200) {
          this.closeModal();
          this.successName = 'Party Updated';
          this.ngOnInit();
          this.Getpartytablefun(0);
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        } else {
          this.errorMessage = response.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.UpdatepartyForm.markAllAsTouched();
    }
  }





  

  showGstDetailsUpdate = false; // Initialize the property
  toggleGstDetailsUpdate(): void {
    this.removeGstValidators();
    this.showGstDetailsUpdate = !this.showGstDetailsUpdate;

    if (this.showGstDetailsUpdate) {
      this.applyGstValidators();
    } else {
      this.removeGstValidators();
    }
  }

  applyGstValidators(): void {
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;

    this.UpdatepartyForm.get('GSTNumber')?.setValidators([Validators.required, Validators.pattern(gstPattern)]);
    this.UpdatepartyForm.get('LegalBusinessName')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('State')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('BillingAddress')?.setValidators([Validators.required]);

    this.UpdatepartyForm.get('GSTNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('LegalBusinessName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('State')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BillingAddress')?.updateValueAndValidity();
  }

  removeGstValidators(): void {
    this.UpdatepartyForm.get('GSTNumber')?.clearValidators();
    this.UpdatepartyForm.get('LegalBusinessName')?.clearValidators();
    this.UpdatepartyForm.get('State')?.clearValidators();
    this.UpdatepartyForm.get('BillingAddress')?.clearValidators();

    this.UpdatepartyForm.get('GSTNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('LegalBusinessName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('State')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BillingAddress')?.updateValueAndValidity();
  }


  applyopeningdetialValidators(): void {
    this.UpdatepartyForm.get('partypayement')?.setValidators([Validators.required,]);
    this.UpdatepartyForm.get('partyamount')?.setValidators([Validators.required]);


    this.UpdatepartyForm.get('partypayement')?.updateValueAndValidity();
    this.UpdatepartyForm.get('partyamount')?.updateValueAndValidity();
  }

  removeopeningdetialValidators(): void {
    this.UpdatepartyForm.get('partypayement')?.clearValidators();
    this.UpdatepartyForm.get('partyamount')?.clearValidators();

    this.UpdatepartyForm.get('partypayement')?.updateValueAndValidity();
    this.UpdatepartyForm.get('partyamount')?.updateValueAndValidity();

  }



  showopeningDetailsUpdate = false;
  toggleopeningbalanceUpdate() {
    this.removeopeningdetialValidators();
    this.showopeningDetailsUpdate = !this.showopeningDetailsUpdate;

    if (this.showopeningDetailsUpdate) {
      this.applyopeningdetialValidators();
    } else {
      this.removeopeningdetialValidators();
    }

  }



  applyBankValidators(): void {
    const IFSCCodePattern = /^[A-Z]{4}[0-9]{7}$/;
    const AccountNumberPattern = /^[0-9]{9,18}$/; // Pattern for Account Number 
    this.UpdatepartyForm.get('AccountholderName')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('AccountNumber')?.setValidators([Validators.required, Validators.pattern(AccountNumberPattern)]);
    this.UpdatepartyForm.get('IFSCCode')?.setValidators([Validators.required, Validators.pattern(IFSCCodePattern)]);
    this.UpdatepartyForm.get('BankName')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('BankAddress')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('IBANNumber')?.setValidators([Validators.required]);
    this.UpdatepartyForm.get('UPI')?.setValidators([Validators.required]);

    this.UpdatepartyForm.get('AccountholderName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('AccountNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('IFSCCode')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BankName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BankAddress')?.updateValueAndValidity();
    this.UpdatepartyForm.get('IBANNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('UPI')?.updateValueAndValidity();
  }

  removebankValidators(): void {
    this.UpdatepartyForm.get('AccountholderName')?.clearValidators();
    this.UpdatepartyForm.get('AccountNumber')?.clearValidators();
    this.UpdatepartyForm.get('IFSCCode')?.clearValidators();
    this.UpdatepartyForm.get('BankName')?.clearValidators();
    this.UpdatepartyForm.get('BankAddress')?.clearValidators();
    this.UpdatepartyForm.get('IBANNumber')?.clearValidators();
    this.UpdatepartyForm.get('UPI')?.clearValidators();

    this.UpdatepartyForm.get('AccountholderName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('AccountNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('IFSCCode')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BankName')?.updateValueAndValidity();
    this.UpdatepartyForm.get('BankAddress')?.updateValueAndValidity();
    this.UpdatepartyForm.get('IBANNumber')?.updateValueAndValidity();
    this.UpdatepartyForm.get('UPI')?.updateValueAndValidity();
  }



















  showbankdetailsUpdate = false;
  togglebankdetailsUpdate(): void {
    this.removebankValidators();
    this.showbankdetailsUpdate = !this.showbankdetailsUpdate;

    if (this.showbankdetails) {

      this.applyBankValidators();
      // Add required validators

    } else {
      this.removebankValidators();

    }

  }

  

}




