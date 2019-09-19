import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
  selector: 'test',
  templateUrl: './test.html'
})

export class TestComponent {

  constructor(public activeRoute: ActivatedRoute, public router: Router) {

  }
}
