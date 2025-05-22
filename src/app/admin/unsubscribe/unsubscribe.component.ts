import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
})
export class UnsubscribeComponent implements OnInit {
  activeTab: string = 'unsubscribed'; // Default to first tab

  unsubscribedUsersWithStores = [
    {
      id: 'USR-001',
      name: 'John Doe',
      storeName: 'HealthPlus Pharmacy',
      unsubscriptionDate: '2025-05-01',
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      storeName: 'CareMed Store',
      unsubscriptionDate: '2025-05-03',
    },
    {
      id: 'USR-003',
      name: 'Robert Brown',
      storeName: 'Wellness Hub',
      unsubscriptionDate: '2025-05-05',
    },
  ];

  recentlyExpiredSubscriptions = [
    {
      id: 'USR-004',
      name: 'Alice Johnson',
      plan: 'Premium',
      expiryDate: '2025-05-10',
    },
    {
      id: 'USR-005',
      name: 'Michael Lee',
      plan: 'Standard',
      expiryDate: '2025-05-12',
    },
    {
      id: 'USR-006',
      name: 'Emma Davis',
      plan: 'Premium',
      expiryDate: '2025-05-14',
    },
  ];

  usersWaitingForApproval = [
    {
      id: 'USR-007',
      name: 'David Wilson',
      storeName: 'City Pharma',
      submissionDate: '2025-05-08',
    },
    {
      id: 'USR-008',
      name: 'Sarah Taylor',
      storeName: 'Green Cross',
      submissionDate: '2025-05-10',
    },
    {
      id: 'USR-009',
      name: 'James Anderson',
      storeName: 'MediCare',
      submissionDate: '2025-05-12',
    },
  ];

  nonApprovedLicenseUsers = [
    {
      id: 'USR-010',
      name: 'Lisa Martinez',
      licenseId: 'LIC-005',
      rejectionDate: '2025-05-02',
      reason: 'Incomplete documentation',
    },
    {
      id: 'USR-011',
      name: 'Thomas Clark',
      licenseId: 'LIC-006',
      rejectionDate: '2025-05-04',
      reason: 'Invalid license details',
    },
    {
      id: 'USR-012',
      name: 'Emily White',
      licenseId: 'LIC-007',
      rejectionDate: '2025-05-06',
      reason: 'Non-compliant store',
    },
  ];

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
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.search = this.searchbarform.get('searchbar')?.value;
      // this.GetSilentUserfun();
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
    // this.GetSilentUserfun();
  }
  onTableDataChange(event: any) {
    this.page = event;
    // this.GetSilentUserfun();
  }
}
