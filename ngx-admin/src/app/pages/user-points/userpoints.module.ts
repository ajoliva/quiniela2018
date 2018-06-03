import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {UserpointsComponent} from './userpoints.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    UserpointsComponent
  ],
  entryComponents:[
  ]
})
export class UserpointsModule { }
