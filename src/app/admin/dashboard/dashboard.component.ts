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

  constructor(private route: ActivatedRoute, private jwtService: JwtService) {
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
    this.name = this.jwtService.getName();
    this.firstlogin = this.jwtService.getfirstLoggedIn();
    console.log(this.firstlogin);
    // TODO: Fetch real stats from a service
    // this.fetchDashboardStats();
  }

  // Optional: Method to fetch stats from a service
  /*
  private fetchDashboardStats(): void {
    this.someService.getDashboardStats().subscribe((data) => {
      this.stats = data;
    });
  }
  */
}
