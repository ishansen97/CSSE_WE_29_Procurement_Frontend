import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
  selector: 'procurement',
  templateUrl: './procurement.html'
})

export class ProcurementComponent {

  constructor(public activeRoute: ActivatedRoute, public router: Router) {

  }
}
