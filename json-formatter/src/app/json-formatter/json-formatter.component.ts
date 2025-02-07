import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-formatter',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, CommonModule],
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.css']
})
export class JsonFormatterComponent {
  inputJson: string = '';
  formattedJson: string = '';
  errorMessage: string = '';

  formatJson() {
    try {
      const parsedJson = JSON.parse(this.inputJson);
      this.formattedJson = JSON.stringify(parsedJson, null, 2);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Invalid JSON! Please check your input.';
      this.formattedJson = '';
    }
  }
}