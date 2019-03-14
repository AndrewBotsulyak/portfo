import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';



@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isCloseSideBare = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.isCloseSideBare = this.breakpointObserver.isMatched('(max-width: 768px)');
  }

}
