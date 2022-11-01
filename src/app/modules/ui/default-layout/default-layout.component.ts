import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultLayoutComponent {

  constructor() {
  }

}
