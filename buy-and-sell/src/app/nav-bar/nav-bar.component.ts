import { RouterLink } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() signOut = new EventEmitter<void>();
  isDarkMode = false;

  ngOnInit(): void {
    const savedMode = localStorage.getItem('theme');
    this.isDarkMode = savedMode === 'dark';
    this.applyTheme();
  }


  onSignOut() {
    this.signOut.emit();
  }

  toggleDarkMode(): void {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}
