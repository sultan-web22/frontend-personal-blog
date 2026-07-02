import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category';
import { toSignal } from '@angular/core/rxjs-interop'; // 👈 Import this!

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  // 1. Convert the Observable stream into a readonly Signal.
  // We pass an empty array [] as the initial value before the HTTP request resolves.
  private rawPrefs = toSignal(this.categoryService.getUserCategories(), { initialValue: [] });

  // 2. Use computed to instantly extract just the string names you want for the UI.
  // Because your service returns an array of objects, we map them down to strings here.
  userCategories = computed(() => {
    const prefs = this.rawPrefs(); // Reads the signal dynamically

    // Flatten your categories object array into a single array of strings
    return prefs.map(p => [p.category1, p.category2, p.category3, p.category4])
                .flat()
                .filter(cat => cat && cat.trim() !== ''); // Clean up empty strings if any
  });

  navigateToCategory(cat: string): void {
    this.router.navigate(['/home', cat]);
  }
}
