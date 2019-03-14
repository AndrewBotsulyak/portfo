import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {SideNavigationComponent} from './side-navigation.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SideNavigationComponent
  ],
  exports: [
    SideNavigationComponent
  ]
})
export class SideNavigationModule { }
