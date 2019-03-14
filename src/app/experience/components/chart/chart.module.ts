import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ChartComponent} from './chart.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    SharedModule,
    ChartsModule
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class ChartModule { }
