import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {UserPredictionsComponent} from './user-predictions.component';

import {EditModalComponent} from './edit-modal/edit-modal.component'


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    UserPredictionsComponent,
    EditModalComponent
  ],
  entryComponents:[
    EditModalComponent
  ]
})
export class UserPredictionsModule { }
