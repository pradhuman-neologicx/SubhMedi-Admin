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
  selector: 'app-new-shops',
  templateUrl: './new-shops.component.html',
  styleUrl: './new-shops.component.scss',
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
export class NewShopsComponent {
  showreset: any = false;
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  authoritycreate!: FormGroup;
  authorityupdate!: FormGroup;
  authorityview!: FormGroup;
  authoritycreateopen: boolean = false;
  banneviewopen: boolean = false;
  companyupdateopen: boolean = false;
  displayedColumns: string[] = [
    'serialNo',
    'FeeType',
    'Amount',
    'status',
    'action',
  ];

  constructor(
    private formBuilder: FormBuilder,
    // private adminService: AdminService,
    private jwtService: JwtService,
    private employeeService: EmployeeService
  ) {}

  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });

    this.authorityview = this.formBuilder.group({
      authorityname: [''],
      State: [''],
      agency_name: [''],
      city_id: [''],
      closing_time: [''],
      opening_time: [''],
      delivery_service_available: [''],
      home_delivery_available: [''],
      owner_alt_contact_no: [''],
      owner_contact_no: [''],
      owner_name: [''],
      owner_residential_address: [''],
      pharmacist_name: [''],
      pin_code: [''],
      store_address: [''],
      store_contact: [''],
      store_email: [''],
      store_tag: [''],
      working_days: [''],
      working_type: [''],
      role: [''],
      gst_no: [''],
      owner_email: [''],
    });

    this.getNewShops();
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
  newshopsTable: any;
  getNewShops() {
    this.employeeService
      .getShopsApi(this.tableSize, this.page, this.search)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.newshopsTable = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
  }

  // Format date function
  formatDateCustom(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  }

  todayDate: string = new Date().toISOString().slice(0, 16);

  updateEndDateMin(): void {
    const startDateControl = this.authoritycreate.controls['StartDate'];
    const endDateControl = this.authoritycreate.controls['endDate'];
    if (startDateControl && endDateControl) {
      endDateControl.setValue(null); // Clear the end date if start date changes
      endDateControl.setErrors(null); // Reset validation errors on end date
    }
  }
  updatentoEndDateMin(): void {
    const startDateControl = this.authorityupdate.controls['StartDate'];
    const endDateControl = this.authorityupdate.controls['endDate'];
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

  viewebannersmodal() {
    this.banneviewopen = true;
  }
  closeModal() {
    this.banneviewopen = false;
    this.authorityview.reset();
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
      this.getNewShops();
    } else {
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
    this.getNewShops();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getNewShops();
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

  onSingleFileSelectedV(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeBytes = 5000000;
      var maxHeight: any;
      var bannertype = this.authorityview.get('BannerType')?.value;
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

  table_heading = [
    {
      heading0: '#',
      heading1: 'Image',
      heading22: 'Agency Name',
      heading2: 'Owner Name',
      heading3: 'Store Address',
      heading4: 'Store Contact',
      heading5: 'Store Email',
      heading6: 'Store Tag',
      heading7: 'Action',
    },
  ];

  studentdetails: any;

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
  authorityId: any;

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

  GetauthoritybyID() {
    this.employeeService
      .getauthobyID(this.authorityId)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.fillformdate(response.data);
          this.fillviewformdate(response.data);
        }
      });
  }

  async fillformdate(response: any) {
    this.authorityupdate = this.formBuilder.group({
      authorityname: [response.name, [Validators.required]],
      State: [response.state_id, [Validators.required]],
    });
  }

  async fillviewformdate(response: any) {
    this.authorityview = this.formBuilder.group({
      authorityname: [response.name],
      State: [response.state.name],
    });
  }

  async OpenviewModal(banner: any) {
    this.banneviewopen = true;
    const transformValue = (value: any): string => {
      if (value === null || value === undefined) {
        return 'Not Available';
      }
      if (value === 1) {
        return 'Yes';
      }
      if (value === 0) {
        return 'No';
      }
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return value.toString();
    };

    // Patch the form with transformed banner data
    this.authorityview.patchValue({
      authorityname: transformValue(banner.agency_name),
      State: transformValue(banner.state.name),
      agency_name: transformValue(banner.agency_name),
      city_id: transformValue(banner.city.name),
      closing_time: transformValue(banner.closing_time),
      opening_time: transformValue(banner.opening_time),
      delivery_service_available: transformValue(
        banner.delivery_service_available
      ),
      home_delivery_available: transformValue(banner.home_delivery_available),
      owner_alt_contact_no: transformValue(banner.owner_alt_contact_no),
      owner_contact_no: transformValue(banner.owner_contact_no),
      owner_email: transformValue(banner.owner_email),
      owner_name: transformValue(banner.owner_name),
      owner_residential_address: transformValue(
        banner.owner_residential_address
      ),
      pharmacist_name: transformValue(banner.pharmacist_name),
      pin_code: transformValue(banner.pin_code),
      store_address: transformValue(banner.store_address),
      store_contact: transformValue(banner.store_contact),
      store_email: transformValue(banner.store_email),
      store_tag: transformValue(banner.store_tag),
      working_days: transformValue(banner.working_days),
      role: transformValue(banner.role),
      gst_no: transformValue(banner.gst_no),
      working_type: transformValue(banner.working_type),
    });
  }

  showApproveDialog = false;

  employeeName: any;

  shopApproveId: any;

  openApproveDialog(shopId: any): void {
    this.shopApproveId = shopId;
    this.showApproveDialog = true;
  }

  closeApproveDialog(): void {
    this.showApproveDialog = false;
    this.errorMessage = '';
  }
  shopApprove(shopId: any) {
    // Validate shopId and user_id before making API call
    if (!shopId) {
      this.errorMessage =
        "Store doesn't have any ID, contact the administrator";
      this.submitted = false;
      return;
    }
    if (!this.user_id) {
      this.errorMessage = 'User ID is required. Please log in again.';
      this.submitted = false;
      return;
    }
    const body = {
      id: shopId,
      user_id: this.user_id,
      is_approved: 1,
    };

    this.submitted = true; // Set submitted to true during API call
    this.errorMessage = ''; // Clear previous error message

    this.employeeService.storeApproveApi(body).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          this.closeApproveDialog();
          this.successName = 'Store Approved';
          this.ngOnInit();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        } else {
          this.submitted = false;
          if (response.status === 422 && response.errors) {
            const errors = response.errors;
            if (
              errors.user_id &&
              Array.isArray(errors.user_id) &&
              errors.user_id.length > 0
            ) {
              this.errorMessage = errors.user_id[0];
            } else {
              const firstErrorField = Object.keys(errors).find(
                (key) => Array.isArray(errors[key]) && errors[key].length > 0
              );
              this.errorMessage = firstErrorField
                ? errors[firstErrorField][0]
                : 'Failed to approve store';
            }
          } else if (response.errors || response.message) {
            this.errorMessage = JSON.stringify(
              response.errors || response.message
            );
          } else {
            this.errorMessage = 'Failed to approve store';
          }
        }
      },
      error: (error: any) => {
        this.submitted = false;
        this.errorMessage =
          error.message || 'An error occurred while approving the store';
      },
    });
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
}
