import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from './login.routing'

import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';


@NgModule({
  imports: [
    ThemeModule,
    LoginRoutingModule,
    MiscellaneousModule,
    DashboardModule
  ],
  exports: [
      
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule { }