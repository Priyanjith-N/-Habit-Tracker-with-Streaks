import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// components
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
