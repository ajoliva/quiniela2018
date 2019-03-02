import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import {GameAdminComponent} from './game-admin.component'

import {EditModalComponent} from './edit-modal/edit-modal.component'


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    GameAdminComponent,
    EditModalComponent
  ],
  entryComponents:[
    EditModalComponent
  ]
})
export class GameAdminModule { }
