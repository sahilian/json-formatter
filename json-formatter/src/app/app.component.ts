import { Component } from '@angular/core';
import { JsonFormatterComponent } from './json-formatter/json-formatter.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonFormatterComponent],
  template: `<app-json-formatter></app-json-formatter>`,
  styles: []
})
export class AppComponent {}