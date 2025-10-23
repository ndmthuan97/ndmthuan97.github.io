import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'header-component',
  standalone: true,
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const inside = target.closest('#dropdownMenu');
  if (!inside) this.isOpen = false;
}

}