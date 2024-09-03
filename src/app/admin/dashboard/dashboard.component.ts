import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
  ],
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
