import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {ProjectionsComponent} from './projections.component';

import {EditModalComponent} from './edit-modal/edit-modal.component'


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    ProjectionsComponent,
    EditModalComponent
  ],
  entryComponents:[
    EditModalComponent
  ]
})
export class ProjectionsModule { }
