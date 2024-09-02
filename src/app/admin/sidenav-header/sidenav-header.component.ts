import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrl: './sidenav-header.component.scss'
})



  export class SidenavHeaderComponent implements OnInit {
    @Output() toggleCollapsed = new EventEmitter<void>();
    searchQuery: string = '';
  
    constructor(private elementRef: ElementRef,private router: Router,) { }
  
    clearSearch(): void {
      this.searchQuery = '';
    }
  
    onInputChange(): void {
      // Add any additional logic if needed
    }
    
  
    isMenuOpen: boolean = false;
    isProfileOpen: boolean = false;
  
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        this.isProfileOpen = false; // Close profile if menu is opened
      }
    }
  
    profile() {
      this.isProfileOpen = !this.isProfileOpen;
      if (this.isProfileOpen) {
        this.isMenuOpen = false; // Close menu if profile is opened
      }
    }
  
    closeMenu() {
      this.isMenuOpen = false;
      this.isProfileOpen = false;
    }
    
  
    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.closeMenu();
      }
    }
  
    ngOnInit() {
      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     this.closeMenu();
      //   }
      // });
    }
    
  
    logout() {
      // this.jwtService.clearStorage();
      this.router.navigate(["/sign_in"]);
    }
  
  
  }