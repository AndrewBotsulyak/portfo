import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperiencePageComponent} from './components/experience-page/experience-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule {}

