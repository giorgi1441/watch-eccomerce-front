import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadComponent: () => import("./features/landing/landing.component").then(c => c.LandingComponent) },
];
