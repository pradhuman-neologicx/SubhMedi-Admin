import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/core/services/Employee.service';
// import { DataTableDirective } from 'angular-datatables';
// import { Config } from 'datatables.net';
// import { Subject } from 'rxjs';
// import { AdminService } from 'src/app/core/services/adminpanel.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
    animations: [
      trigger('succesfullyMesaage', [
        state(
          'void',
          style({
            transform: 'translateX(-30%)',
            opacity: 0,
          })
        ),
        transition(':enter, :leave', [
          animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)'),
        ]),
      ]),
      trigger('slideIn', [
        state(
          'void',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
          })
        ),
        transition(':enter', [
          animate(
            '0.5s ease-out',
            style({
              transform: 'translateX(0)', // Final position for slide-in effect
              opacity: 1, // Final opacity
            })
          ),
        ]),
      ]),
  
      trigger('fadeIn', [
        state(
          'void',
          style({
            opacity: 0,
            transform: 'scale(0.5)', // Start with smaller size
          })
        ),
        transition(':enter', [
          animate(
            '0.5s ease-out',
            style({
              opacity: 1,
              transform: 'scale(1)', // Final size
            })
          ),
        ]),
      ]),
    ],
})


export class CompaniesComponent {
  showreset: any = false;
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  bannercreate!: FormGroup;
  bannerupdate!: FormGroup;
  bannerview!: FormGroup;
  companycreateopen: boolean = false;
  banneviewopen: boolean = false;
  companyupdateopen: boolean = false;
  displayedColumns: string[] = [
    'serialNo',
    'FeeType',
    'Amount',
    'status',
    'action',
  ];

  // dtOptions: Config = {};
  // @ViewChild(DataTableDirective, { static: false })
  // dtElement!: DataTableDirective;
  // dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    // private adminService: AdminService,
    private jwtService: JwtService,
     private employeeService: EmployeeService,
  ) {}

  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ["", [Validators.required,]]
    });
    this.bannercreate = this.formBuilder.group({
      // BannerType: ['', [Validators.required]],
      description: ['',[Validators.required]],
      Website: ['', [Validators.required]],

      // StartDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]],
    });
    this.bannerupdate = this.formBuilder.group({
      // BannerType: [''],
      // description: [description, [Validators.required,],],
      description: ['', [Validators.required]],
      Website: ['', [Validators.required]],

      // StartDate: [''],
      // endDate: [''],
    });
    this.bannerview = this.formBuilder.group({
     
      description: [''],
      Website: [''],
   
    });

    this.GetBanners();
  }
  batchfloorList: any = [];

  clickedOption(event: any) {
    console.log(event);
  }

  bannerfile!: string;

  Onselectbanner(value: any) {
    this.bannerfile = value;
  }

  search: any;
  bannerTable: any;
  GetBanners() {
    this.employeeService
      .Getconpanies(this.tableSize, this.page, this.search, this.statusfilter)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.bannerTable = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
  }

  // Dummy data for bannerTable
  // bannerTable = [
  //   {
  //     id: 1,
  //     image: 'IMG_1',
  //     description: 'Banner 1 Description',
  //     type: 'Promo',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: 1,
  //     action: '',
  //   },
  //   {
  //     id: 2,
  //     image: 'IMG_2',
  //     description: 'Banner 2 Description',
  //     type: 'Advertisement',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: 0,
  //     action: '',
  //   },
  //   {
  //     id: 3,
  //     image: 'IMG_3',
  //     description: 'Banner 3 Description',
  //     type: 'Campaign',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: 1,
  //     action: '',
  //   },
  //   {
  //     id: 4,
  //     image: 'IMG_4',
  //     description: 'Banner 4 Description',
  //     type: 'Promo',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: 0,
  //     action: '',
  //   },
  //   {
  //     id: 5,
  //     image: 'IMG_5',
  //     description: 'Banner 5 Description',
  //     type: 'Event',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: 1,
  //     action: '',
  //   },
  // ];

  // Format date function
  formatDateCustom(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  }

  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  statusfilter: any;
  onStatusChange(event: any) {
    const status = event.target.value;
    if (status === '') {
      // this.Getfaqs(); // Show All
      this.statusfilter = undefined;
    } else if (status === '1') {
      // this.ShowActive(); // Show Active
      this.statusfilter = '1';
    } else if (status === '0') {
      this.statusfilter = '0';
    }
    this.GetBanners();
  }

  // ShowActive() {
  //   this.adminService
  //     .Getbanners(this.tableSize, this.page, this.search, '1')
  //     .subscribe((response: any) => {
  //       this.bannerTable = response.data.records.filter(
  //         (o: any) => o.status === 1
  //       );
  //       this.totalRecords = response.data.total;
  //       this.isDropdownOpen = false;
  //     });
  // }

  // ShowDeactive() {
  //   this.adminService
  //     .Getbanners(this.tableSize, this.page, this.search, '0')
  //     .subscribe((response: any) => {
  //       this.bannerTable = response.data.records.filter(
  //         (o: any) => o.status === 0
  //       );
  //       this.totalRecords = response.data.total;
  //       this.isDropdownOpen = false;
  //     });
  // }

  checkedAttendanceList: any[] = []; // Store selected items' IDs

  isMasterSel!: boolean;

  insertIsSelected() {
    if (this.bannerTable != undefined) {
      this.bannerTable.forEach((item: any) => {
        item['isSelected'] = false;
      });
      console.log(this.bannerTable);
    }
  }

  checkUncheckAll(isSelected: boolean) {
    console.log(isSelected);
    this.isMasterSel = isSelected; // Set master selection state
    this.bannerTable.forEach((item: any) => {
      item.isSelected = isSelected;
    });
    this.getCheckedItemList(); // Refresh selected items
  }

  onChange(item: any, isChecked: boolean) {
    item.isSelected = isChecked; // Update the individual item's state
    if (isChecked) {
      this.checkedAttendanceList.push(item.id);
    } else {
      this.checkedAttendanceList = this.checkedAttendanceList.filter(
        (id) => id !== item.id
      );
    }
    console.log(this.checkedAttendanceList);
  }

  getCheckedItemList() {
    this.checkedAttendanceList = this.bannerTable
      .filter((item: any) => item.isSelected)
      .map((item: any) => item.id);
    console.log(this.checkedAttendanceList);
  }

  bulkacitve: boolean = false;
  bulkdecitve: boolean = false;
  MarkAbsent: boolean = false;
  Norecord: boolean = false;

  // Bulk activation/deactivation handler
  Bulkactive() {
    if (this.checkedAttendanceList.length > 0) {
      this.bulkacitve = true; // Show modal
    } else {
      this.Norecord = true; // Show no record selected message
      setTimeout(() => {
        this.Norecord = false;
      }, 1800);
    }
  }
  Bulkdeactive() {
    if (this.checkedAttendanceList.length > 0) {
      this.bulkdecitve = true; // Show modal
    } else {
      this.Norecord = true; // Show no record selected message
      setTimeout(() => {
        this.Norecord = false;
      }, 1800);
    }
  }

  // // Perform status bulk change
  Statusbulkactivechnage() {
    if (this.checkedAttendanceList.length === 0) {
      return;
    }
    console.log(this.bannerTable);
    console.log(this.checkedAttendanceList);
    console.log(this.checkedAttendanceList);
    // Determine the status to toggle
    const status = this.bannerTable.some(
      (item: any) =>
        this.checkedAttendanceList.includes(item.id) && item.status === 1
    )
      ? 'deactivate'
      : 'activate';
    const activeIds = this.checkedAttendanceList.filter((id: any) => {
      return this.bannerTable.some(
        (item: any) => item.id === id && item.status === 1
      );
    });
    const deactiveIds = this.checkedAttendanceList.filter((id: any) => {
      return this.bannerTable.some(
        (item: any) => item.id === id && item.status === 0
      );
    });
    console.log(status);
    // Make the API call
    // if (deactiveIds.length > 0) {
    //   this.adminService
    //     .bulkchangestatus(deactiveIds, 'Banner', 'active')
    //     .subscribe(
    //       (response: any) => {
    //         console.log(response);
    //         if (response.status === 200) {
    //           this.closeModal();
    //           // this.successName = status === 'activate' ? 'activated' : 'deactivated';
    //           this.successName = 'Status Activated';
    //           this.checkedAttendanceList = [];
    //           this.isMasterSel = false; // Uncheck the header checkbox
    //           this.bannerTable.forEach(
    //             (item: any) => (item.isSelected = false)
    //           );

    //           setTimeout(() => {
    //             this.openSecondsuccess = true;
    //             setTimeout(() => {
    //               this.openSecondsuccess = false;
    //               this.ngOnInit();
    //               this.GetBanners();
    //             }, 1800);
    //           }, 200);
    //         }
    //       },
    //       (error) => {
    //         console.error('Error occurred:', error);
    //       }
    //     );
    // } else {
    //   alert('All selected Banners are already active');
    //   this.closeModal();
    // }
  }

  // // Perform status bulk change
  Statusbulkdeactivechnage() {
    if (this.checkedAttendanceList.length === 0) {
      return;
    }
    console.log(this.bannerTable);
    console.log(this.checkedAttendanceList);
    console.log(this.checkedAttendanceList);
    // Determine the status to toggle
    const status = this.bannerTable.some(
      (item: any) =>
        this.checkedAttendanceList.includes(item.id) && item.status === 1
    )
      ? 'deactivate'
      : 'activate';
    const activeIds = this.checkedAttendanceList.filter((id: any) => {
      return this.bannerTable.some(
        (item: any) => item.id === id && item.status === 1
      );
    });
    const deactiveIds = this.checkedAttendanceList.filter((id: any) => {
      return this.bannerTable.some(
        (item: any) => item.id === id && item.status === 0
      );
    });
    console.log(status);
    // Make the API call
    // if (activeIds.length > 0) {
    //   this.adminService
    //     .bulkchangestatus(activeIds, 'Banner', 'inactive')
    //     .subscribe(
    //       (response: any) => {
    //         console.log(response);
    //         if (response.status === 200) {
    //           this.closeModal();
    //           // this.successName = status === 'activate' ? 'activated' : 'deactivated';
    //           this.successName = 'Status Deactivated';
    //           this.checkedAttendanceList = [];
    //           this.isMasterSel = false; // Uncheck the header checkbox
    //           this.bannerTable.forEach(
    //             (item: any) => (item.isSelected = false)
    //           );

    //           setTimeout(() => {
    //             this.openSecondsuccess = true;
    //             setTimeout(() => {
    //               this.openSecondsuccess = false;
    //               this.ngOnInit();
    //               this.GetBanners();
    //             }, 1800);
    //           }, 200);
    //         }
    //       },
    //       (error) => {
    //         console.error('Error occurred:', error);
    //       }
    //     );
    // } else {
    //   alert('All selected Banners are already deactive');
    //   this.closeModal();
    // }
  }

  // // Perform status bulk change
  Statusbulkchnage() {
    if (this.checkedAttendanceList.length === 0) {
      return;
    }

    // Determine the status to toggle
    const status = this.bannerTable.some(
      (item: any) =>
        this.checkedAttendanceList.includes(item.id) && item.status === 'active'
    )
      ? 'deactivate'
      : 'activate';

    // Make the API call
    // this.adminService
    //   .bulkchangestatus(this.checkedAttendanceList, 'Banner', 'active')
    //   .subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       if (response.status === 200) {
    //         this.closeModal();
    //         // this.successName = status === 'activate' ? 'activated' : 'deactivated';
    //         this.successName = 'Status Changed';
    //         this.checkedAttendanceList = [];
    //         this.isMasterSel = false; // Uncheck the header checkbox
    //         this.bannerTable.forEach((item: any) => (item.isSelected = false));

    //         setTimeout(() => {
    //           this.openSecondsuccess = true;
    //           setTimeout(() => {
    //             this.openSecondsuccess = false;
    //             this.ngOnInit();
    //             this.GetBanners();
    //           }, 1800);
    //         }, 200);
    //       }
    //     },
    //     (error) => {
    //       console.error('Error occurred:', error);
    //     }
    //   );
  }
  deleteopen: boolean = false;
  deletemodal() {
    if (this.checkedAttendanceList.length > 0) {
      this.deleteopen = true; // Show modal
    } else {
      this.Norecord = true; // Show no record selected message
      setTimeout(() => {
        this.Norecord = false;
      }, 1800);
    }
  }

  deleteall() {
    if (this.checkedAttendanceList.length === 0) {
      return;
    }

    // Make the API call
    // this.adminService.deletebanner(this.checkedAttendanceList).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       // Show success message and refresh data
    //       this.successName = 'Deleted Banners';
    //       this.closeModal(); // Close the delete modal
    //       this.checkedAttendanceList = []; // Clear selected items
    //       this.isMasterSel = false; // Reset "Select All" checkbox
    //       this.bannerTable.forEach((item: any) => (item.isSelected = false)); // Uncheck all items

    //       // Display success and refresh table
    //       setTimeout(() => {
    //         this.openSecondsuccess = true;
    //         setTimeout(() => {
    //           this.openSecondsuccess = false;
    //           this.ngOnInit();
    //           this.GetBanners();
    //         }, 1800);
    //       }, 200);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error occurred:', error);
    //   }
    // );
  }

  //   async Statusbulkchnage(id: string) {
  //     const actionMessage = status ? 'activated' : 'deactivated';

  //     this.adminService.bulkchangestatus(id, 'Banner')

  //       .subscribe((response: any) => {
  //         console.log(response);
  //         if (response.status === 200) {
  //           this.successName = actionMessage;
  //           this.GetBanners();
  //           setTimeout(() => {
  //             this.openSecondsuccess = true;
  //             setTimeout(() => {
  //               this.openSecondsuccess = false;
  //             }, 1800);
  //           }, 200);
  //         }
  //       },
  //       );
  //   }

  // // Bulk activation and bulk deactivation
  // isMasterSel!: boolean;
  // insertIsSelected() {
  //   if (this.bannerTable != undefined) {
  //     this.bannerTable.forEach((car: any) => {
  //       car["isSelected"] = false;
  //     });
  //     console.log(this.bannerTable);
  //   }
  // }
  // checkUncheckAll(isSelected: boolean) {
  //   console.log(isSelected);
  //   if (isSelected) {
  //     for (var i = 0; i < this.bannerTable.length; i++) {
  //       console.log(this.bannerTable[i].isSelected);
  //       this.bannerTable[i].isSelected = isSelected;
  //     }
  //   } else {
  //     for (var i = 0; i < this.bannerTable.length; i++) {
  //       console.log(this.bannerTable[i].isSelected);
  //       this.bannerTable[i].isSelected = isSelected;
  //     }
  //   }
  //   this.getCheckedItemList(isSelected);
  // }
  // checkedAttendanceList: any = [];

  // onChange(email: string, isChecked: boolean) {
  //   if (isChecked) {
  //     this.checkedAttendanceList.push(email);
  //     console.log(this.checkedAttendanceList);
  //   } else {
  //     let index = this.checkedAttendanceList.indexOf(email);
  //     this.checkedAttendanceList.splice(index, 1);
  //     console.log(this.checkedAttendanceList);
  //   }
  // }
  // getCheckedItemList(isSelected: boolean) {
  //   this.checkedAttendanceList = [];
  //   if (isSelected) {
  //     for (var i = 0; i < this.bannerTable.length; i++) {
  //       this.checkedAttendanceList.push(this.bannerTable[i]);
  //     }
  //   }
  //   console.log(this.checkedAttendanceList);
  // }

  // bulkacitve: boolean = false;
  // bulkdecitve: boolean = false;
  // MarkAbsent: boolean = false;
  // Norecord: boolean = false;

  // Bulkactive(){
  //   if (this.checkedAttendanceList.length > 0) {
  //     this.bulkacitve = true;
  //     }
  //     else{
  //       this.Norecord = true;
  //       setTimeout(() => {
  //         this.Norecord = false;
  //       }, 1800);
  //     }
  // }

  // Bulkdeactive(){
  //   if (this.checkedAttendanceList.length > 0) {
  //     this.bulkdecitve = true;
  //     }
  //     else{
  //       this.Norecord = true;
  //       setTimeout(() => {
  //         this.Norecord = false;
  //       }, 1800);
  //     }
  // }

  todayDate: string = new Date().toISOString().slice(0, 16);

  updateEndDateMin(): void {
    const startDateControl = this.bannercreate.controls['StartDate'];
    const endDateControl = this.bannercreate.controls['endDate'];
    if (startDateControl && endDateControl) {
      endDateControl.setValue(null); // Clear the end date if start date changes
      endDateControl.setErrors(null); // Reset validation errors on end date
    }
  }
  updatentoEndDateMin(): void {
    const startDateControl = this.bannerupdate.controls['StartDate'];
    const endDateControl = this.bannerupdate.controls['endDate'];
    if (startDateControl && endDateControl) {
      endDateControl.setValue(null); // Clear the end date if start date changes
      endDateControl.setErrors(null); // Reset validation errors on end date
    }
  }

  successName: any = '';
  openSecondsuccess: boolean = false;
  errorMessage: any;
  submitted!: boolean;
  buttonClicked = false;

  async Status(id: string, status: any) {
    const actionMessage = status ? 'activated' : 'deactivated';

    this.employeeService
      .changestatuss(id, status, 'Company')

      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.successName = actionMessage;
          this.GetBanners();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
  }

  bannermodal() {
    this.companycreateopen = true;
    this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
  }
  updatebannersmodal() {
    this.companyupdateopen = true;
  }
  viewebannersmodal() {
    this.banneviewopen = true;
  }
  closeModal() {
    this.companycreateopen = false;
    this.companyupdateopen = false;
    this.banneviewopen = false;
    this.bulkacitve = false;
    this.bulkdecitve = false;
    this.deleteopen = false;
  }
  ClickexamModalconent(event: Event): void {
    event.stopPropagation();
  }
  ClickexamupdateModalconent(event: Event): void {
    event.stopPropagation();
  }
  ClickexamviewModalconent(event: Event): void {
    event.stopPropagation();
  }

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.search = this.searchbarform.get('searchbar')?.value;
      this.GetBanners()
    }
    else {
      this.searchbarform.markAllAsTouched();
    }
  }
  resetsearchbar() {
    window.location.reload();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    console.log(event.target.value);
    this.page = 1;
    this.GetBanners();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.GetBanners();
  }

  selectedFileNames: string[] = [];
  selectedFiles: any[] = [];
  selectedImages: { imageSrc: string | null; id: number }[] = [];
  fileSizeError: string = '';

  // file code for mobile and website
  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.selectedFileNames.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  generateUniqueId(): number {
    return Math.floor(Math.random() * Date.now());
  }

  onSingleFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      var bannertype = this.bannercreate.get('BannerType')?.value;
      if (bannertype == 'Advertisement') {
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }
        const maxSizeBytes = 5000000;
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }

        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];

        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
              if (image.width === 1878 && image.height === 281) {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              } else {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image must be 1878 x 281 pixels`;
              }
            };
          }
        };

        reader.readAsDataURL(file);
      } else {
        const maxSizeBytes = 5000000;
        var maxHeight: any;
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }

        if (bannertype == 'Advertisement') {
          // 5MB for the file
          maxHeight = 500;
        } else {
          maxHeight = 700;
        }
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }

        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];

        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
              if (image.height > maxHeight) {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
              } else {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              }
            };
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }

  onSingleFileSelectedU(event: any) {
    const file = event.target.files[0];
    if (file) {
      var bannertype = this.bannerupdate.get('BannerType')?.value;
      if (bannertype == 'Advertisement') {
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }
        const maxSizeBytes = 5000000;
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }

        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];

        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
              if (image.width === 1878 && image.height === 281) {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              } else {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image must be 1878 x 281 pixels`;
              }
            };
          }
        };

        reader.readAsDataURL(file);
      } else {
        const maxSizeBytes = 5000000;
        var maxHeight: any;
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }

        if (bannertype == 'Advertisement') {
          // 5MB for the file
          maxHeight = 500;
        } else {
          maxHeight = 700;
        }
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }

        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];

        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
              if (image.height > maxHeight) {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
              } else {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              }
            };
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }
  onSingleFileSelectedV(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeBytes = 5000000;
      var maxHeight: any;
      var bannertype = this.bannerview.get('BannerType')?.value;
      if (bannertype == 'Advertisement') {
        // 5MB for the file
        maxHeight = 500;
      } else {
        maxHeight = 700;
      }
      if (file.size > maxSizeBytes) {
        this.fileSizeError =
          'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
        return;
      }

      const reader = new FileReader();
      this.selectedFileNames = [file.name];
      this.selectedFiles = [file];

      reader.onload = () => {
        if (typeof reader.result === 'string' || reader.result === null) {
          const id = this.generateUniqueId();
          const imageSrc = reader.result as string;
          const image = new Image();
          image.src = imageSrc;

          image.onload = () => {
            if (image.height > maxHeight) {
              this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
            } else {
              this.selectedImages = [{ imageSrc, id }];
              this.fileSizeError = '';
            }
          };
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // FOR MULTI SELECT FILES IMAGES//
  // onMultipleFilesSelected(event: any) {
  //   const files = event.target.files;
  //   this.selectedImages = [];
  //   this.selectedFileNames = [];

  //   if (files) {
  //       for (let i = 0; i < files.length; i++) {
  //           const file = files[i];
  //           this.selectedFileNames.push(file.name);

  //           const reader = new FileReader();
  //           reader.onload = (e: any) => {
  //               this.selectedImages.push({
  //                 imageSrc: e.target.result,
  //                 id: 0
  //               });
  //           };
  //           reader.readAsDataURL(file);
  //       }
  //   }
  // }
  table_heading = [
    {
      heading0: '#',
      heading1: 'Image',
      heading2: 'Company Name',
      // heading4: 'Date added',
      // heading5: 'Date modified',
      // heading6: 'Status',
      heading7: 'Action',
    },
  ];
  // formatDateCustom(dateString: string): string {
  //   const date = new Date(dateString);

  //   // Extract date components
  //   const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  //   const year = date.getFullYear();

  //   // Extract time components
  //   const hours = date.getHours();
  //   const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero

  //   // Determine AM/PM
  //   const period = hours >= 12 ? 'PM' : 'AM';
  //   const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  //   // Combine into desired format
  //   return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
  // }
  studentdetails: any;

  Createcompany() {
    if (this.bannercreate.valid) {
      const formData: FormData = new FormData();
    
      formData.append(
        'name',
        this.bannercreate.get('description')?.value
      );
   

      if (this.selectedFiles.length > 0) {
        const file = this.selectedFiles[0];
        formData.append('image', file, file.name);
      }
      if (
        this.selectedFileNames.toString().includes('jpeg') ||
        this.selectedFileNames.toString().includes('jpg') ||
        this.selectedFileNames.toString().includes('png')
      ) {
        this.employeeService.createcompany(formData).subscribe((response: any) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            this.closeModal();
            this.successName = 'Company Created';
            this.ngOnInit();
            this.GetBanners();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          } else {
            this.submitted = false;
            if (
              typeof (response.errors ?? response.message) === 'object' &&
              (response.errors ?? response.message) !== null &&
              !Array.isArray(response.errors ?? response.message)
            ) {
              this.errorMessage = JSON.stringify(
                response.errors ?? response.message
              );
            } else {
              this.errorMessage = response.errors;
            }
            alert(this.errorMessage);
          }
        });
      }
    } else {
      this.submitted = false;
      this.errorMessage = 'please Enter All The Details';
      this.bannercreate.markAllAsTouched();
      console.log(this.findInvalidControls(this.bannercreate));
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

  Updatecompany() {
    if (this.bannerupdate.valid) {
      const formData: FormData = new FormData();
   
      formData.append(
        'name',
        this.bannerupdate.get('description')?.value
      );
      formData.append("_method", "put");
    
      if (this.selectedFiles.length > 0) {
        const file = this.selectedFiles[0];
        formData.append('image', file, file.name);
      } else {
        this.submitted = false;
        this.errorMessage = 'please select file';
        return;
      }
      if (
        this.selectedFileNames.toString().includes('jpeg') ||
        this.selectedFileNames.toString().includes('jpg') ||
        this.selectedFileNames.toString().includes('png')
      ) {
        this.employeeService.updatecompany(formData,this.companyId).subscribe((response: any) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            this.closeModal();
            this.successName = 'Company Updated';
            this.ngOnInit();
            this.GetBanners();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          } else {
            this.submitted = false;
            if (
              typeof (response.errors ?? response.message) === 'object' &&
              (response.errors ?? response.message) !== null &&
              !Array.isArray(response.errors ?? response.message)
            ) {
              this.errorMessage = JSON.stringify(
                response.errors ?? response.message
              );
            } else {
              this.errorMessage = response.errors;
            }
            alert(this.errorMessage);
          }
        });
      } else {
        this.submitted = false;
        this.errorMessage = 'please select correct file';
        this.bannerupdate.markAllAsTouched();
      }
    } else {
      this.submitted = false;
      this.errorMessage = 'please Enter All The Details';
      this.bannerupdate.markAllAsTouched();
      console.log(this.findInvalidControls(this.bannerupdate));
    }
  }

  // convertDate(dateStr: string): string | null {
  //   console.log(dateStr)
  //   // Create a regular expression to match the date format
  //   // const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}) (AM|PM)/i;
  //   const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2})/i;
  //   let match = dateStr.replace('AM','').replace('PM','').match(regex);
  //   console.log(match)
  //   if (!match) {
  //     console.error("Invalid date format");
  //     return null;
  //   }

  //   // Extract the matched parts
  //   const [_, year, month, day, hours, minutes, period] = match;

  //   // // Convert hours based on AM/PM
  //   let adjustedHours = parseInt(hours, 10);
  //   if ( adjustedHours < 12) {
  //     adjustedHours += 12; // Convert PM hours
  //   }
  //   if (adjustedHours === 12) {
  //     adjustedHours = 0; // Midnight case
  //   }

  //   // Construct a new Date object (using UTC for consistency)
  //   const date = new Date(Date.UTC(+year, +month - 1, +day, adjustedHours, +minutes));

  //   // Check if the date is valid
  //   if (isNaN(date.getTime())) {
  //     console.error("Invalid date format");
  //     return null;
  //   }

  //   // Format the date to the desired format "YYYY-MM-DDTHH:MM"
  //   const formattedDate = [
  //     date.getFullYear(),
  //     '-',
  //     String(date.getMonth() + 1).padStart(2, '0'),
  //     '-',
  //     String(date.getDate()).padStart(2, '0'),
  //     'T',
  //     String(date.getUTCHours()).padStart(2, '0'),
  //     ':',
  //     String(date.getUTCMinutes()).padStart(2, '0')
  //   ].join('');
  //   console.log(formattedDate)
  //   return formattedDate;
  // }

  convertDate24(dateStr: string): string | null {
    console.log(dateStr);
    // Create a regular expression to match the date format
    const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}) (AM|PM)/i;
    const match = dateStr.match(regex);

    if (!match) {
      console.error('Invalid date format');
      return null;
    }

    // Extract the matched parts
    const [_, year, month, day, hours, minutes, period] = match;

    // Convert hours based on AM/PM
    let adjustedHours = parseInt(hours, 10);
    if (period.toUpperCase() === 'PM' && adjustedHours < 12) {
      adjustedHours += 12; // Convert PM hours
    }
    if (period.toUpperCase() === 'AM' && adjustedHours === 12) {
      adjustedHours = 0; // Midnight case
    }

    // Construct a new Date object (using UTC for consistency)
    const date = new Date(
      Date.UTC(+year, +month - 1, +day, adjustedHours, +minutes)
    );

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date format');
      return null;
    }

    // Format the date to the desired format "YYYY-MM-DDTHH:MM"
    const formattedDate = [
      date.getFullYear(),
      '-',
      String(date.getMonth() + 1).padStart(2, '0'),
      '-',
      String(date.getDate()).padStart(2, '0'),
      'T',
      String(date.getUTCHours()).padStart(2, '0'),
      ':',
      String(date.getUTCMinutes()).padStart(2, '0'),
    ].join('');
    console.log(formattedDate);
    return formattedDate;
  }




  GetgetcompanybyID() {
    this.employeeService.getcompanybyID(this.companyId).subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {

        this.fillformdate(response.data);
        this.fillviewformdate(response.data);

      }

    });
  }

  async fillformdate(response: any) {

      this.bannerupdate = this.formBuilder.group({
      
        description: [response.name],
        Website: [response.image, [Validators.required]],
      });
  

      var file = await this.createFile(response.image);
      // if (file) {
      //   var bannertype = response.type;
      //   if (bannertype == 'Advertisement') {
      //     const fileType = file.type;
      //     const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      //     if (!validImageTypes.includes(fileType)) {
      //       this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       return;
      //     }
      //     const maxSizeBytes = 5000000;
      //     if (file.size > maxSizeBytes) {
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       this.fileSizeError =
      //         'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
      //       return;
      //     }

      //     const reader = new FileReader();
      //     this.selectedFileNames = [file.name];
      //     this.selectedFiles = [file];

      //     reader.onload = () => {
      //       if (typeof reader.result === 'string' || reader.result === null) {
      //         const id = this.generateUniqueId();
      //         const imageSrc = reader.result as string;
      //         const image = new Image();
      //         image.src = imageSrc;

      //         image.onload = () => {
      //           if (image.width === 1878 && image.height === 281) {
      //             this.selectedImages = [{ imageSrc, id }];
      //             this.fileSizeError = '';
      //           } else {
      //             this.selectedImages = [];
      //             this.selectedFileNames = [];
      //             this.selectedFiles = [];
      //             this.fileSizeError = `The selected image must be 1878 x 281 pixels`;
      //           }
      //         };
      //       }
      //     };

      //     reader.readAsDataURL(file);
      //   } else {
      //     const maxSizeBytes = 5000000;
      //     var maxHeight: any;
      //     const fileType = file.type;
      //     const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      //     if (!validImageTypes.includes(fileType)) {
      //       this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       return;
      //     }

      //     if (bannertype == 'Advertisement') {
      //       // 5MB for the file
      //       maxHeight = 500;
      //     } else {
      //       maxHeight = 700;
      //     }
      //     if (file.size > maxSizeBytes) {
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       this.fileSizeError =
      //         'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
      //       return;
      //     }

      //     const reader = new FileReader();
      //     this.selectedFileNames = [file.name];
      //     this.selectedFiles = [file];

      //     reader.onload = () => {
      //       if (typeof reader.result === 'string' || reader.result === null) {
      //         const id = this.generateUniqueId();
      //         const imageSrc = reader.result as string;
      //         const image = new Image();
      //         image.src = imageSrc;

      //         image.onload = () => {
      //           if (image.height > maxHeight) {
      //             this.selectedImages = [];
      //             this.selectedFileNames = [];
      //             this.selectedFiles = [];
      //             this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
      //           } else {
      //             this.selectedImages = [{ imageSrc, id }];
      //             this.fileSizeError = '';
      //           }
      //         };
      //       }
      //     };

      //     reader.readAsDataURL(file);
      //   }
      // }
      if (file) {
        const maxSizeBytes = 5000000;
        var maxHeight: any;
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }
      
        maxHeight = 700;
      
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }
      
        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];
      
        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;
      
            image.onload = () => {
              if (image.height > maxHeight) {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
              } else {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              }
            };
          }
        };
      
        reader.readAsDataURL(file);
      }
      
    } 
   
    
    async fillviewformdate(response: any) {

      this.bannerview = this.formBuilder.group({
      
        description: [response.name],
        Website: [response.image, [Validators.required]],
      });
  

      var file = await this.createFile(response.image);
      // if (file) {
      //   var bannertype = response.type;
      //   if (bannertype == 'Advertisement') {
      //     const fileType = file.type;
      //     const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      //     if (!validImageTypes.includes(fileType)) {
      //       this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       return;
      //     }
      //     const maxSizeBytes = 5000000;
      //     if (file.size > maxSizeBytes) {
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       this.fileSizeError =
      //         'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
      //       return;
      //     }

      //     const reader = new FileReader();
      //     this.selectedFileNames = [file.name];
      //     this.selectedFiles = [file];

      //     reader.onload = () => {
      //       if (typeof reader.result === 'string' || reader.result === null) {
      //         const id = this.generateUniqueId();
      //         const imageSrc = reader.result as string;
      //         const image = new Image();
      //         image.src = imageSrc;

      //         image.onload = () => {
      //           if (image.width === 1878 && image.height === 281) {
      //             this.selectedImages = [{ imageSrc, id }];
      //             this.fileSizeError = '';
      //           } else {
      //             this.selectedImages = [];
      //             this.selectedFileNames = [];
      //             this.selectedFiles = [];
      //             this.fileSizeError = `The selected image must be 1878 x 281 pixels`;
      //           }
      //         };
      //       }
      //     };

      //     reader.readAsDataURL(file);
      //   } else {
      //     const maxSizeBytes = 5000000;
      //     var maxHeight: any;
      //     const fileType = file.type;
      //     const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      //     if (!validImageTypes.includes(fileType)) {
      //       this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       return;
      //     }

      //     if (bannertype == 'Advertisement') {
      //       // 5MB for the file
      //       maxHeight = 500;
      //     } else {
      //       maxHeight = 700;
      //     }
      //     if (file.size > maxSizeBytes) {
      //       this.selectedImages = [];
      //       this.selectedFileNames = [];
      //       this.selectedFiles = [];
      //       this.fileSizeError =
      //         'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
      //       return;
      //     }

      //     const reader = new FileReader();
      //     this.selectedFileNames = [file.name];
      //     this.selectedFiles = [file];

      //     reader.onload = () => {
      //       if (typeof reader.result === 'string' || reader.result === null) {
      //         const id = this.generateUniqueId();
      //         const imageSrc = reader.result as string;
      //         const image = new Image();
      //         image.src = imageSrc;

      //         image.onload = () => {
      //           if (image.height > maxHeight) {
      //             this.selectedImages = [];
      //             this.selectedFileNames = [];
      //             this.selectedFiles = [];
      //             this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
      //           } else {
      //             this.selectedImages = [{ imageSrc, id }];
      //             this.fileSizeError = '';
      //           }
      //         };
      //       }
      //     };

      //     reader.readAsDataURL(file);
      //   }
      // }
      if (file) {
        const maxSizeBytes = 5000000;
        var maxHeight: any;
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
        if (!validImageTypes.includes(fileType)) {
          this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          return;
        }
      
        maxHeight = 700;
      
        if (file.size > maxSizeBytes) {
          this.selectedImages = [];
          this.selectedFileNames = [];
          this.selectedFiles = [];
          this.fileSizeError =
            'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
          return;
        }
      
        const reader = new FileReader();
        this.selectedFileNames = [file.name];
        this.selectedFiles = [file];
      
        reader.onload = () => {
          if (typeof reader.result === 'string' || reader.result === null) {
            const id = this.generateUniqueId();
            const imageSrc = reader.result as string;
            const image = new Image();
            image.src = imageSrc;
      
            image.onload = () => {
              if (image.height > maxHeight) {
                this.selectedImages = [];
                this.selectedFileNames = [];
                this.selectedFiles = [];
                this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
              } else {
                this.selectedImages = [{ imageSrc, id }];
                this.fileSizeError = '';
              }
            };
          }
        };
      
        reader.readAsDataURL(file);
      }
      
    } 
    

    companyId: any;
  async OpenEditModal(banner: any) {
   // this.banneviewopen = false;
   this.companyupdateopen = true
    this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
    this.companyId = banner.id;
this.GetgetcompanybyID();
    // try {
    //   if (!banner || !banner.id) {
    //     console.error('unit ID is undefined or null.');
    //     return;
    //   }

    //   this.companyupdateopen = true;
    //   this.bannerupdate = this.formBuilder.group({
    //     // BannerType: [banner.type, [
    //     //   Validators.required,
    //     // ],],
    //     // BannerType: [banner.type],
    //     description: [banner.description, [Validators.required]],
    //     Website: [banner.image, [Validators.required]],

    //     // StartDate: [
    //     //   this.convertDate24(banner.start_time),
    //     //   [Validators.required],
    //     // ],
    //     // endDate: [this.convertDate24(banner.end_time), [Validators.required]],
    //   });
    //   // this.typebannervalidatioupdate(banner.type);

    //   var file = await this.createFile(banner.image);
    //   if (file) {
    //     var bannertype = banner.type;
    //     if (bannertype == 'Advertisement') {
    //       const fileType = file.type;
    //       const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    //       if (!validImageTypes.includes(fileType)) {
    //         this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
    //         this.selectedImages = [];
    //         this.selectedFileNames = [];
    //         this.selectedFiles = [];
    //         return;
    //       }
    //       const maxSizeBytes = 5000000;
    //       if (file.size > maxSizeBytes) {
    //         this.selectedImages = [];
    //         this.selectedFileNames = [];
    //         this.selectedFiles = [];
    //         this.fileSizeError =
    //           'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
    //         return;
    //       }

    //       const reader = new FileReader();
    //       this.selectedFileNames = [file.name];
    //       this.selectedFiles = [file];

    //       reader.onload = () => {
    //         if (typeof reader.result === 'string' || reader.result === null) {
    //           const id = this.generateUniqueId();
    //           const imageSrc = reader.result as string;
    //           const image = new Image();
    //           image.src = imageSrc;

    //           image.onload = () => {
    //             if (image.width === 1878 && image.height === 281) {
    //               this.selectedImages = [{ imageSrc, id }];
    //               this.fileSizeError = '';
    //             } else {
    //               this.selectedImages = [];
    //               this.selectedFileNames = [];
    //               this.selectedFiles = [];
    //               this.fileSizeError = `The selected image must be 1878 x 281 pixels`;
    //             }
    //           };
    //         }
    //       };

    //       reader.readAsDataURL(file);
    //     } else {
    //       const maxSizeBytes = 5000000;
    //       var maxHeight: any;
    //       const fileType = file.type;
    //       const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    //       if (!validImageTypes.includes(fileType)) {
    //         this.fileSizeError = 'Only PNG , JPEG and JPG formats are allowed.';
    //         this.selectedImages = [];
    //         this.selectedFileNames = [];
    //         this.selectedFiles = [];
    //         return;
    //       }

    //       if (bannertype == 'Advertisement') {
    //         // 5MB for the file
    //         maxHeight = 500;
    //       } else {
    //         maxHeight = 700;
    //       }
    //       if (file.size > maxSizeBytes) {
    //         this.selectedImages = [];
    //         this.selectedFileNames = [];
    //         this.selectedFiles = [];
    //         this.fileSizeError =
    //           'The selected file exceeds the maximum allowed size (5MB). Please choose a smaller file.';
    //         return;
    //       }

    //       const reader = new FileReader();
    //       this.selectedFileNames = [file.name];
    //       this.selectedFiles = [file];

    //       reader.onload = () => {
    //         if (typeof reader.result === 'string' || reader.result === null) {
    //           const id = this.generateUniqueId();
    //           const imageSrc = reader.result as string;
    //           const image = new Image();
    //           image.src = imageSrc;

    //           image.onload = () => {
    //             if (image.height > maxHeight) {
    //               this.selectedImages = [];
    //               this.selectedFileNames = [];
    //               this.selectedFiles = [];
    //               this.fileSizeError = `The selected image dimensions exceed the maximum allowed size`;
    //             } else {
    //               this.selectedImages = [{ imageSrc, id }];
    //               this.fileSizeError = '';
    //             }
    //           };
    //         }
    //       };

    //       reader.readAsDataURL(file);
    //     }
    //   }
    // } catch (error) {
    //   console.error('An error occurred while opening edit modal:', error);
    // }
  }

  async OpenviewModal(banner: any) {
    this.banneviewopen = true;
      this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
    this.companyId = banner.id;
    this.GetgetcompanybyID();

    
  }

  async createFile(url: string) {
    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg',
    };
    let file = new File([data], fileName, metadata);

    return file;
    // ... do something with the file or return it
  }

  typebannervalidation(value: any) {
    this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
    this.bannercreate.get('StartDate')?.clearValidators();
    this.bannercreate.get('endDate')?.clearValidators();

    if (this.bannercreate.get('BannerType')?.value === 'Advertisement') {
      this.bannercreate.get('StartDate')?.setValidators(Validators.required);
      this.bannercreate.get('endDate')?.setValidators(Validators.required);
    } else {
      this.bannercreate.get('StartDate')?.clearValidators();
      this.bannercreate.get('endDate')?.clearValidators();
    }
    // Update validation status

    this.bannercreate.get('StartDate')?.updateValueAndValidity();
    this.bannercreate.get('endDate')?.updateValueAndValidity();
  }

  typebannervalidatioupdate(value: any) {
    this.bannerupdate.get('StartDate')?.clearValidators();
    this.bannerupdate.get('endDate')?.clearValidators();

    if (this.bannerupdate.get('BannerType')?.value === 'Advertisement') {
      this.bannerupdate.get('StartDate')?.setValidators(Validators.required);
      this.bannerupdate.get('endDate')?.setValidators(Validators.required);
    } else {
      this.bannerupdate.get('StartDate')?.clearValidators();
      this.bannerupdate.get('endDate')?.clearValidators();
    }
    // Update validation status

    this.bannerupdate.get('StartDate')?.updateValueAndValidity();
    this.bannerupdate.get('endDate')?.updateValueAndValidity();
  }
}
