import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AboutPageComponent} from './about-page.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent]
})
export class AboutPageModule { }
