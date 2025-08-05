import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  openSecondsuccess = false;
  name: string | null = '';
  firstlogin: boolean | undefined;
  stats = {
    totalUsers: 1250,
    totalPharmacies: 320,
    totalDistributors: 85,
    silentUsers: 150,
    dailyActiveUsers: 450,
    newlyRegisteredUsers: 75,
    approval_awaiting_licenses: 75,
  };
  storesAwaitingApproval = [
    { name: 'HealthPlus Pharmacy', submissionDate: '2025-05-10' },
    { name: 'CareMed Store', submissionDate: '2025-05-12' },
    { name: 'Wellness Hub', submissionDate: '2025-05-14' },
  ];

  licenseExpiryAlerts = [
    {
      id: 'LIC-001',
      pharmacyName: 'City Pharma',
      expiryDate: '2025-04-30',
      status: 'Expired',
    },
    {
      id: 'LIC-002',
      pharmacyName: 'Green Cross',
      expiryDate: '2025-05-05',
      status: 'Expired',
    },
    {
      id: 'LIC-003',
      pharmacyName: 'MediCare',
      expiryDate: '2025-05-20',
      status: 'Expiring Soon',
    },
    {
      id: 'LIC-004',
      pharmacyName: 'HealthPoint',
      expiryDate: '2025-05-25',
      status: 'Expiring Soon',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.firstlogin = this.jwtService.getfirstLoggedIn();
      console.log(this.firstlogin);
      if (this.firstlogin === false || this.firstlogin === undefined) {
        if (params['success'] === 'true') {
          this.openSecondsuccess = true;
          this.jwtService.firstLoggedIn(true);
          setTimeout(() => {
            this.openSecondsuccess = false;
          }, 1800);
        }
      }
    });
  }

  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.name = this.jwtService.getName();
    this.firstlogin = this.jwtService.getfirstLoggedIn();
    console.log(this.firstlogin);
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
    this.getDashnoardData();
  }
  user_id: any;
  // Optional: Method to fetch stats from a service
  /*
  private fetchDashboardStats(): void {
    this.someService.getDashboardStats().subscribe((data) => {
      this.stats = data;
    });
  }
  */
  dashboardData: any;
  totalRecords: any;
  getDashnoardData() {
    this.employeeService.getDashboardData().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.dashboardData = response.data;
        this.totalRecords = response.data.total;
      }
    });
  }
  getLicenseStatus(expiryDate: string): string {
    const today = new Date();
    const expiry = new Date(expiryDate);

    return expiry < today ? 'Expired' : 'Expiring Soon';
  }

  successName: any = '';
  errorMessage: any;
  submitted!: boolean;
  showApproveDialog = false;
  showApproveLicenseDialog = false;
  authorityview!: FormGroup;
  employeeName: any;

  shopApproveId: any;
  banneviewopen: boolean = false;
  openApproveDialog(shopId: any): void {
    this.shopApproveId = shopId;
    this.showApproveDialog = true;
  }

  closeApproveDialog(): void {
    this.showApproveDialog = false;
    this.errorMessage = '';
  }
  closeModal() {
    this.banneviewopen = false;
    this.authorityview.reset();
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
  ClickexamModalconent(event: Event): void {
    event.stopPropagation();
  }
}
