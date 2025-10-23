import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { AboutComponent } from './layout/about/about.component';

@Component({
  selector: 'app-root',
  imports: [ ButtonModule, HeaderComponent, HomeComponent, AboutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
