import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RegisterComponent } from './register.component';
import {RegisterRoutingModule} from './register.routing'

import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';


@NgModule({
  imports: [
    ThemeModule,
    RegisterRoutingModule,
    MiscellaneousModule,
    DashboardModule
  ],
  exports: [
      
  ],
  declarations: [
    RegisterComponent
  ],
})
export class RegisterModule { }