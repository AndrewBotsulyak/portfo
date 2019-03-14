import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AboutPageModule} from './components/about-page/about-page.module';
import {AboutRoutingModule} from './about-routing.module';


@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule,
    AboutPageModule
  ]
})
export class AboutModule {}
