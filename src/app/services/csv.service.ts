import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  exportToCsv(data: any[], fileName: string) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
