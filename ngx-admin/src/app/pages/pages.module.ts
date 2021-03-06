import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import {ProjectionsModule} from './projections/projections.module';
import {UserPredictionsModule} from './user-predictions/user-predictions.module'
import { LeaderboardModule } from './leaderboards/leaderboard.module';
import { UserpointsModule } from './user-points/userpoints.module';
import { GameAdminModule } from './game-admin/game-admin.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ProjectionsModule,
    UserPredictionsModule,
    LeaderboardModule,
    UserpointsModule,
    GameAdminModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
