import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {ToolbarComponent} from "../../../../modules/ui/toolbar/toolbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [CommonModule, RouterOutlet, ToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
