import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PortfolioPageModule} from './components/portfolio-page/portfolio-page.module';
import {PortfolioRoutingModule} from './portfolio-routing.module';


@NgModule({
  imports: [
    SharedModule,
    PortfolioRoutingModule,
    PortfolioPageModule
  ]
})
export class PortfolioModule {}

