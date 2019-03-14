import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {MainLayoutModule} from './layouts/main/main-layout.module';
import {HttpClientModule} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material';
import {InlineIconRegistry} from './shared/inline-icon-registry';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    MainLayoutModule
  ],
  providers: [
    {
      provide: MatIconRegistry,
      useClass: InlineIconRegistry,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
