import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/course.service';
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
  ) { }
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
      PhoneNumber: ["",]
    });


    this.Getpartytablefun();
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
  OpenCreateModal(){
    this.Createpartyopen=true;
  }
  closeModal(){
    this.Createpartyopen= false;
  }

  submitted: any;
  errorMessage: any;
  CratenewPartyFun(){

  }



  PartTypeList: any;
  GetPartyType() {
    this.courseService.GetpartyTypetableApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.PartTypeList = response.party_types;
      }
      console.log(this.PartTypeList);

    });
  }



  showGstDetails = false;

  toggleGstDetails() {
    this.showGstDetails = !this.showGstDetails;
  }

}
