import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {LeaderboardComponent} from './leaderboard.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    LeaderboardComponent
  ],
  entryComponents:[
  ]
})
export class LeaderboardModule { }
