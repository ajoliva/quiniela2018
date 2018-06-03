import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProjectionsComponent} from './projections/projections.component'

import { AuthGuard } from '../pages/services/auth/auth.guard.component';
import { UserPredictionsComponent } from './user-predictions/user-predictions.component';
import { LeaderboardComponent } from './leaderboards/leaderboard.component';

const routes: Routes = [
  
  {
  path: '',
  component: PagesComponent,
  children: [
    /* {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  }, */ {
    path: 'projections',
    component:ProjectionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'predictions',
    component:UserPredictionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'leaderboard',
    component:LeaderboardComponent,
    canActivate:[AuthGuard]
  }, /* {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, */ {
    path: '',
    redirectTo: 'projections',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
