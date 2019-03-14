import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ExperiencePageModule} from './components/experience-page/experience-page.module';
import {ExperienceRoutingModule} from './experience-routing.module';


@NgModule({
  imports: [
    SharedModule,
    ExperienceRoutingModule,
    ExperiencePageModule
  ],
  declarations: []
})
export class ExperienceModule {}
