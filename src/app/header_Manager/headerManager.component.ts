import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './headerManager.component.html',
  styleUrls: ['./headerManager.component.css']
})

export class HeaderManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

// export const routerConfig: Routes = [
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: 'about',
//     component: AboutComponent
//   },
//   {
//     path: 'courses',
//     component: CoursesComponent
//   },
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   },
//   {
//     path: '**',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   }
// ];

