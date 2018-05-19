import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {ProjectionsComponent} from './projections.component';



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    ProjectionsComponent
  ],
})
export class ProjectionsModule { }
