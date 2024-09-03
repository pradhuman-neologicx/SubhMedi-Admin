import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  openSecondsuccess = false;
  successName: any;
  name: any;
  firstlogin:any;
  constructor(private route: ActivatedRoute, private jwtService: JwtService,) {
    this.route.queryParams.subscribe((params) => {
      this.firstlogin = this.jwtService.getfirstLoggedIn();
      console.log(this.firstlogin);
      if(this.firstlogin===false ||this.firstlogin==undefined ){
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
  }
}
