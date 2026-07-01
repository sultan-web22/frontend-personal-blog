// src/app/features/dashboard/sidebar/sidebar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private stateService = inject(StateService);
  private router = inject(Router);

  categories$ = this.stateService.categories$;
  activeCategory$ = this.stateService.activeCategory$;

  selectCategory(category: string): void {
    // 1. Update centralized state
    this.stateService.setActiveCategory(category);

    // 2. Safely route to the dynamic category path (e.g., /dashboard/Programming)
    const encodedCategory = encodeURIComponent(category);
    this.router.navigate(['/dashboard', encodedCategory]);
  }
}
