import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/NavPath';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navPathData: NavPath;
  from: string;
  to: string;
  way: string;
  showWay: boolean;

  constructor() { }

  ngOnInit() {
    this.showWay = false;
    this.navPathData = new NavPath();
  }

  searchWay(from: string, to: string) {
    this.navPathData.from = from;
    this.navPathData.to = to;
    this.showWay = true;
  }
}
