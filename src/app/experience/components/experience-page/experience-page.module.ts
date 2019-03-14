import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ExperiencePageComponent} from './experience-page.component';
import {ChartModule} from '../chart/chart.module';

@NgModule({
  imports: [
    SharedModule,
    ChartModule
  ],
  declarations: [ExperiencePageComponent],
  exports: [ExperiencePageComponent]
})
export class ExperiencePageModule { }
