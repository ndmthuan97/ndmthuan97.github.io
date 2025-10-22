import { Component } from "@angular/core";
import { SocialComponent } from "./social/social.component";

@Component({
    selector: 'home-component',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [SocialComponent],
})

export class HomeComponent {
    
}