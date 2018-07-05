import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { navPath } from '../../Objects/navPath'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navPathData: navPath;
  from: string;
  to: string;
  way: string;
  showWay: boolean;

  constructor() { }

  ngOnInit() {
    this.showWay = false;
    this.navPathData = new navPath();
  }

  searchWay(from: string, to: string){
    this.navPathData.from = from;
    this.navPathData.to = to;
    this.showWay = true;
  }
}
