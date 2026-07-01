// src/app/core/services/state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState, IUserProfile } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: IAppState = {
    user: null,
    activeCategory: 'Daily'
  };

  private stateSubject = new BehaviorSubject<IAppState>(this.initialState);
  public state$: Observable<IAppState> = this.stateSubject.asObservable();

  // Streams for components to consume cleanly
  public categories$: Observable<string[]> = this.state$.pipe(
    map(state => state.user ? state.user.categories : ['Daily'])
  );

  public activeCategory$: Observable<string> = this.state$.pipe(
    map(state => state.activeCategory)
  );

  // Triggered when user logs in successfully
  public loadUserSession(userProfile: IUserProfile): void {
    this.stateSubject.next({
      user: userProfile,
      activeCategory: userProfile.categories[0] || 'Daily'
    });
  }

  // Triggered when sidebar items are clicked
  public setActiveCategory(category: string): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      activeCategory: category
    });
  }
}
