import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard]
    }
];
