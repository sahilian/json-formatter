// json-formatter.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface JsonNode {
  key: string;
  value: any;
  type: 'object' | 'array' | 'primitive';
  collapsed: boolean;
  children?: JsonNode[];
}

@Component({
  selector: 'app-json-formatter',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, CommonModule, MatIconModule],
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.css']
})
export class JsonFormatterComponent {
  inputJson: string = '';
  formattedJson: string = '';
  parsedData: JsonNode[] = [];
  errorMessage: string = '';
  isCollapsible: boolean = false;

  // Format JSON with proper indentation
  formatJson(): void {
    try {
      const parsed = JSON.parse(this.inputJson);
      this.formattedJson = JSON.stringify(parsed, null, 2);
      this.parsedData = this.parseJsonData(parsed);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Invalid JSON! Please check your input.';
      this.formattedJson = '';
      this.parsedData = [];
    }
  }

  // Toggle collapsible view
  toggleCollapsible(): void {
    this.isCollapsible = !this.isCollapsible;
  }

  // Toggle collapse/expand for a node
  toggleCollapse(node: JsonNode): void {
    node.collapsed = !node.collapsed;
  }

  // Recursively parse JSON data into a tree structure
  private parseJsonData(data: any, key?: string): JsonNode[] {
    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).map(k => ({
        key: k,
        value: data[k],
        type: Array.isArray(data[k]) ? 'array' : 'object',
        collapsed: false,
        children: this.parseJsonData(data[k])
      }));
    }
    return [{
      key: key || '',
      value: data,
      type: 'primitive',
      collapsed: false
    }];
  }
}