import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { DataService } from 'src/app/core/services/data.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
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
export class AttendanceComponent {
  CalendarForm!: FormGroup;
  searchbarform!: FormGroup;
  maxDate: Date;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private courseService: CourseService,
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) {
    this.maxDate = new Date();
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    this.projectiD = router.url.slice(0).split(urlDelimitators)[2];

  }

  AddWorkerForm!: FormGroup;
  userId: any;
  projectID:any;
  ngOnInit(): void {
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.userId = this.jwtService.getpanelUserId();
    this.CalendarForm = this.formBuilder.group({
      Caledardate: [this.maxDate,
      [
        Validators.required,
      ],
      ],
    },);
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });

    this.AddWorkerForm = this.formBuilder.group({
      PartyType: ["", [Validators.required,]],
    });








this.GetPartyType();
    this.GetAttendanceFun();
  }



  searchfun() {
    this.showreset = true;
  }


  resetsearchbar() {

  }


  showreset: any = false;
  totalPresent:any;
  totalAbsent:number = 0;
  totalNetAmount:number = 0;
workertable:any
  Attendancetable: any;
  projectiD : any;
  GetAttendanceFun() {
    // staticid "16","17","2024-09-05"
    

const caledardateValue = this.CalendarForm.get('Caledardate')?.value;
const formattedDate = caledardateValue ? new Date(caledardateValue).toISOString().split('T')[0] : '';

    this.courseService.getAttendacneAPI(this.projectID,this.userId,formattedDate).subscribe((response: any) => {
      console.log(this.CalendarForm.get('Caledardate')?.value);
      console.log(this.projectID);
      if (response.status === 200) {
        this.Attendancetable = response.data;
        this.totalPresent = response.total_present ?? 0;
        this.totalAbsent = response.total_absent ?? 0;
        this.totalNetAmount = response.total_net_amount ?? 0;
        console.log(this.totalPresent);
        this.workertable = this.Attendancetable.flatMap((attendance: any) => attendance.workforces || []);
      }
    });
  }

  ViewDetailopen: boolean = false;

  OpenViewDetails(): void {
    this.ViewDetailopen=true;
  }

  closeModal(){
    this.ViewDetailopen=false;
    this.addworkeropen=false;
  }



  addworkeropen: boolean = false;


  AddopenWorker(): void {
    this.addworkeropen=true;
  }
  PartTypeList: any;
  GetPartyType() {
    this.courseService.GetpartyTypetableApi().subscribe((response: any) => {
      if (response.status === 200) {
        this.PartTypeList = response.party_types;
        this.filteredPartyTypes = this.filterPartyTypes(this.PartTypeList);
      }
      console.log(this.PartTypeList);
    });
  }

  filteredPartyTypes:any;
  filterPartyTypes(partyTypes: any[]): any[] {
    // Define the types you want to filter
    const typesToInclude = ['staff', 'labour', 'labour contractor'];
    return partyTypes.filter(type => typesToInclude.includes(type.name.toLowerCase()));
  }

  partyTypeName: any
  partyTypeNameupdate: any;
  staffselect(value: any) {
    var newlist = this.PartTypeList.filter((courseType: any) => courseType.id == value);

    console.log(newlist);
    if (newlist.length > 0) {
      this.partyTypeName = newlist[0].name;
    }
  }

}

