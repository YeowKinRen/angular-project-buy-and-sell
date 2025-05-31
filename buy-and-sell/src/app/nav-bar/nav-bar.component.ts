import { RouterLink } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() signOut = new EventEmitter<void>();

  onSignOut() {
    this.signOut.emit();
  }
}
