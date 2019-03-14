import { NgModule } from '@angular/core';
import {MainLayoutComponent} from './main-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {SideNavigationModule} from '../../core/components/side-navigation/side-navigation.module';

@NgModule({
  imports: [
    SharedModule,
    SideNavigationModule
  ],
  exports: [
    MainLayoutComponent
  ],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
