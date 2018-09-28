import {Component, Input, OnInit} from '@angular/core';
import { RouteWidgetInfo } from '../../Objects/routeWidgetInfo';

@Component({
    selector: 'app-route-widget',
    templateUrl: './route-widget.component.html',
    styleUrls: ['./route-widget.component.css']
})
export class RouteWidgetComponent implements OnInit {

    @Input() info: RouteWidgetInfo;

    constructor() { }

    ngOnInit() {
    }

}
