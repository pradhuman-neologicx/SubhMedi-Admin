import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
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
export class UnsubscribeComponent implements OnInit {
  activeTab: string = 'expired';
  activeSubTab: string = 'stores';
  authoritycreate!: FormGroup;
  authorityupdate!: FormGroup;
  approvalForm!: FormGroup;
  authorityview!: FormGroup;
  licenceView!: FormGroup;
  authoritycreateopen: boolean = false;
  banneviewopen: boolean = false;
  licenceViewOpen: boolean = false;
  companyupdateopen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService
  ) {}
  showreset: any = false;
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  user_id: any;
  search: any;
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

    this.licenceView = this.formBuilder.group({
      authority_name: [''],
      shop_name: [''],
      license_number: [''],
      expiry_date: [''],
      status: [''],
      identity_proof: [''],
      compliance_document: [''],
    });
    // Initialize approval form
    this.approvalForm = this.formBuilder.group({
      action: ['', Validators.required],
    });
    this.fetchDataForActiveTab();
    // this.getNewShops();
    // this.getApprovedLicenseUsers();
    // this.getCompanies();
  }

  // setActiveTab(tab: string): void {
  //   this.activeTab = tab;
  // }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.page = 1;
    this.search = '';
    this.searchbarform.reset();
    this.showreset = false;
    if (tab === 'approvals') {
      this.activeSubTab = 'stores'; // Default to "stores" sub-tab
    }
    this.fetchDataForActiveTab();
  }

  setActiveSubTab(subTab: string): void {
    this.activeSubTab = subTab;
    this.page = 1;
    this.search = '';
    this.searchbarform.reset();
    this.showreset = false;
    this.fetchDataForActiveTab();
  }

  fetchDataForActiveTab(): void {
    if (this.activeTab === 'expired') {
      this.getExpiredSubscriptions();
    } else if (this.activeTab === 'approvals') {
      if (this.activeSubTab === 'stores') {
        this.getNewShops();
      } else if (this.activeSubTab === 'licenses') {
        this.getApprovedLicenseUsers();
      } else if (this.activeSubTab === 'companies') {
        this.getCompanies();
      }
    }
  }
  // searchfun() {
  //   if (this.searchbarform.valid) {
  //     this.showreset = true;
  //     this.search = this.searchbarform.get('searchbar')?.value;
  //     if (this.activeTab === 'expired') {
  //       this.getExpiredSubscriptions();
  //     } else if (this.activeTab === 'approvals') {
  //       this.getNewShops();
  //     } else if (this.activeTab === 'nonApproved') {
  //       this.getApprovedLicenseUsers();
  //     }
  //   } else {
  //     this.searchbarform.markAllAsTouched();
  //   }
  // }
  searchfun(): void {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.search = this.searchbarform.get('searchbar')?.value;
      this.page = 1; // Reset to first page on search
      this.fetchDataForActiveTab();
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
    this.fetchDataForActiveTab();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchDataForActiveTab();
  }
  ClickexamModalconent(event: Event): void {
    event.stopPropagation();
  }
  usersWaitingForApproval: any;
  userType: any;
  getNewShops() {
    this.userType = 'stores';
    this.employeeService
      .getShopsApi(this.tableSize, this.page, this.search, this.userType)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.usersWaitingForApproval = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
  }
  recentlyExpiredSubscriptions: any;
  totalRecordSubscription: any;
  getExpiredSubscriptions() {
    this.userType = 'subscriptions';
    this.employeeService
      .getShopsApi(this.tableSize, this.page, this.search, this.userType)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.recentlyExpiredSubscriptions = response.data.records;
          this.totalRecordSubscription = response.data.total;
        }
      });
  }
  nonApprovedLicenseUsers: any;
  totalRecordsLicense: any;
  getApprovedLicenseUsers() {
    this.userType = 'licenses';
    this.employeeService
      .getShopsApi(this.tableSize, this.page, this.search, this.userType)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.nonApprovedLicenseUsers = response.data.records;
          this.totalRecordsLicense = response.data.total;
        }
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
  IdProof: any;
  complianceDocument: any;
  async OpenLiecenceviewModal(licence: any) {
    this.licenceViewOpen = true;
    this.IdProof = licence?.identity_proof;
    this.complianceDocument = licence?.compliance_document;
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
    this.licenceView.patchValue({
      authority_name: transformValue(licence.authority?.name),
      shop_name: transformValue(licence.shop?.agency_name),
      license_number: transformValue(licence.license_number),
      expiry_date: transformValue(licence.expiry_date),
      status: transformValue(licence.status),
      identity_proof: transformValue(licence.identity_proof),
      compliance_document: transformValue(licence.compliance_document),
    });
  }

  successName: any = '';
  openSecondsuccess: boolean = false;
  errorMessage: any;
  submitted!: boolean;
  showApproveDialog = false;
  showApproveLicenseDialog = false;

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
  closeModal() {
    this.banneviewopen = false;
    this.licenceViewOpen = false;
    this.authorityview.reset();
    this.licenceView.reset();
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
  submitLicApproval() {
    // Validate shopId and user_id before making API call
    if (this.approvalForm.valid && this.shopApproveLicId) {
      if (!this.user_id) {
        this.errorMessage = 'User ID is required. Please log in again.';
        this.submitted = false;
        return;
      }

      const body = {
        license_id: this.shopApproveLicId,
        user_id: this.user_id,
        status:
          this.approvalForm.get('action')?.value === 'approve'
            ? 'approved'
            : 'rejected',
      };

      this.submitted = true; // Set submitted to true during API call
      this.errorMessage = ''; // Clear previous error message

      this.employeeService.storeLicenseApproveApi(body).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            this.closeApproveLicenseDialog();
            this.successName = 'Status Upadated';
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
                  : 'Failed to update status';
              }
            } else if (response.errors || response.message) {
              this.errorMessage = JSON.stringify(
                response.errors || response.message
              );
            } else {
              this.errorMessage = 'Failed to update status';
            }
          }
        },
        error: (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while update status';
        },
      });
    } else {
      this.errorMessage = 'Please select an action (Approve or Reject).';
    }
  }
  // Open the approval dialog
  shopApproveLicId: any;
  openApproveLicenseDialog(shopId: number) {
    this.shopApproveLicId = shopId;
    this.showApproveLicenseDialog = true;
    this.errorMessage = '';
    this.approvalForm.reset();
  }

  // Close the approval dialog
  closeApproveLicenseDialog() {
    this.showApproveLicenseDialog = false;
    this.approvalForm.reset();
    this.errorMessage = '';
  }

  awaitingCompanies: any;
  totalRecordsCompany: any;
  getCompanies() {
    this.userType = 'companies';
    this.employeeService
      .getShopsApi(this.tableSize, this.page, this.search, this.userType)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.awaitingCompanies = response.data.records;
          this.totalRecordsCompany = response.data.total;
        }
      });
  }
  showApproveCompanyDialog = false; // New variable for company approval dialog
  shopApproveCompanyId: any;
  openApproveCompanyDialog(companyId: number) {
    this.shopApproveCompanyId = companyId;
    this.showApproveCompanyDialog = true;
    this.errorMessage = '';
    this.approvalForm.reset();
  }

  closeApproveCompanyDialog() {
    this.showApproveCompanyDialog = false;
    this.approvalForm.reset();
    this.errorMessage = '';
  }

  submitCompanyApproval() {
    if (this.approvalForm.valid && this.shopApproveCompanyId) {
      if (!this.user_id) {
        this.errorMessage = 'User ID is required. Please log in again.';
        this.submitted = false;
        return;
      }

      const body = {
        id: this.shopApproveCompanyId, // Updated to use company_id
        user_id: this.user_id,
        status:
          this.approvalForm.get('action')?.value === 'approve'
            ? 'approved'
            : 'rejected',
      };

      this.submitted = true;
      this.errorMessage = '';

      this.employeeService.companyApproveApi(body).subscribe({
        // Assuming you have a companyApproveApi method in EmployeeService
        next: (response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.closeApproveCompanyDialog();
            this.successName = 'Company Status Updated';
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
                  : 'Failed to update company status';
              }
            } else if (response.errors || response.message) {
              this.errorMessage = JSON.stringify(
                response.errors || response.message
              );
            } else {
              this.errorMessage = 'Failed to update company status';
            }
          }
        },
        error: (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while updating company status';
        },
      });
    } else {
      this.errorMessage = 'Please select an action (Approve or Reject).';
    }
  }
}
