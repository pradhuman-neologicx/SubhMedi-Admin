import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-projecthome',
  templateUrl: './projecthome.component.html',
  styleUrl: './projecthome.component.scss'
})
export class ProjecthomeComponent {

// data table code
selected: boolean = true;
selectedSecond: boolean = false;
url1:any;
public vehicle_tabs = [
  {
    index: 1,
    title: 'Parties',
    link: 'project_parties',
  },
  {
    index: 2,
    title: 'Transactions',
    link: 'project_transactions',
  },
  {
    index: 3,
    title: 'Attendance',
    link: 'project_attendance',
  },
  {
    index: 4,
    title: 'Material',
    link: 'project_material',
  },



  
];
sessionId: any;
currentRoute: any;
public active!: number;
public select: any;
projectiD : any

constructor(

  private jwtService: JwtService,
  private router: Router,
  private route: ActivatedRoute,
) {
  const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
  this.url1 = router.url.slice(0).split(urlDelimitators)[3];

  this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Could add more chars url:path?=;other possible
     
    
      const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
      // this.projectiD = router.url.slice(0).split(urlDelimitators)[2];
      let currentUrlPath = event.url.slice(0).split(urlDelimitators)[3];
      if (currentUrlPath == undefined) {
        this.active = 1;
        this.select = this.vehicle_tabs[0];
      }
      this.currentRoute = currentUrlPath;
      if (this.currentRoute == 'project_parties') {
        this.selected = true;
        this.selectedSecond = false;
      } else if (this.currentRoute == 'project_transactions') {
        this.selected = false;
        this.selectedSecond = true;
      }
      else if (this.currentRoute == 'project_attendance') {
        this.selected = false;
        this.selectedSecond = true;
      }
      else if (this.currentRoute == 'project_material') {
        this.selected = false;
        this.selectedSecond = true;
      }
      console.log(this.currentRoute);
      for (let i = 0; i < this.vehicle_tabs.length; i++) {
        if (this.currentRoute == this.vehicle_tabs[i].link) {
          this.active = this.vehicle_tabs[i].index;
          this.select = this.vehicle_tabs[i];
        }
      }
    }
  });
}





ngOnInit() {
  this.sessionId = this.jwtService.getSession();
  //  console.log(this.url1 == 'ongoing');
  //  console.log(this.url1 == 'completed');
   if (this.url1 == 'project_parties') {
     let btn = document.getElementById('pills-collect-tab');
     console.log(btn);
     btn?.click();
   } else if (this.url1 == 'project_transactions') {
     let btn = document.getElementById('pills-feestatus-tab');
     btn?.click();
   }
   else if (this.url1 == 'project_attendance') {
    let btn = document.getElementById('transaction-tab');
    btn?.click();
  }
   else if (this.url1 == 'project_material') {
    let btn = document.getElementById('pills-otherFee-tab');
    btn?.click();
  }
}
NavigationTab(type: any) {
  if (type == 1) {
    this.router.navigate(['/project_home/'+this.projectiD+'/project_parties']);
  } else if (type == 2) {
    this.router.navigate(['/project_home/'+this.projectiD+'/project_transactions']);
  } 
  else if (type == 3) {
    this.router.navigate(['/project_home/'+this.projectiD+'/project_attendance']);
  }
  else if (type == 4) {
    this.router.navigate(['/project_home/'+this.projectiD+'/project_material']);
  }
}
Active(item: any) {
  return this.select === item;
}

// downloadFile(): void {
//   const url = `${environment.feesurl}payment/export-students-with-fee-status/${this.sessionId}`;
//   this.httpClient.get(url, { responseType: 'blob', observe: 'response' })
//     .subscribe(
//       (response: HttpResponse<Blob>) => {
//         const contentDisposition = response.headers.get('Content-Disposition');
//         let fileName = 'PendingExport.csv'; // Default file name

//         if (contentDisposition) {
//           const matches = /filename="([^"]*)"/.exec(contentDisposition);
//           if (matches != null && matches[1]) {
//             fileName = matches[1];
//           }
//         }

//         if (response.body) {
//           saveAs(response.body, fileName);
//         } else {
//           console.error('Response body is null.');
//         }
//       },
//       (error: any) => {
//         console.error('Failed to download the file.', error);
//         // Handle error as needed
//       }
//     );
// }

}
