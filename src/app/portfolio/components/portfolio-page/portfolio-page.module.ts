import { NgModule } from '@angular/core';
import {PortfolioPageComponent} from './portfolio-page.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PortfolioPageComponent],
  exports: [
    PortfolioPageComponent
  ]
})
export class PortfolioPageModule { }
