import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {InlineIconRegistry} from './shared/inline-icon-registry';

@Component({
  selector: 'app-root',
  template: `
    <main-layout>
      <router-outlet></router-outlet>
    </main-layout>
  `,
})
export class AppComponent {
  title = 'stairway';


  constructor(
    private matIconRegistry: MatIconRegistry
  ) {

    /**
     * Add SVG Icons
     */
    if (matIconRegistry instanceof InlineIconRegistry) {
      matIconRegistry.mbAddSvgIconSet(
        require('!!raw-loader!assets/img/material/sprite.svg'));
    }
  }

}
