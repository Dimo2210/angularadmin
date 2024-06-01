import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  getcustomer: any[];
  currentPage = 1;
  itemsPerPage = 5; // Number of items per page
  totalItems = 100; // Total number of items in the table, update this dynamically
  constructor(private HttpService: HttpService) { }

  ngOnInit(): void {
    this.fetchcustomer();
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  fetchcustomer() {
    this.HttpService.getcustomer().subscribe(
        response => {
            console.log('customer:', response);
            this.getcustomer = response;
        },
        error => {
            console.error('Error fetching customer:', error);
        }
    );
  }
  exportToCSV(): void {
    // Function to convert table data to CSV format
    const convertToCSV = (table: HTMLTableElement): string => {
      const rows = table.querySelectorAll("tr");
      const csv = [];
      for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) {
          // Use type assertion to inform TypeScript about the type
          const cell = cols[j] as HTMLTableCellElement;
          row.push(cell.innerText);
        }
        csv.push(row.join(","));
      }
      return csv.join("\n");
    }

    // Get the table
    const table = document.querySelector(".table") as HTMLTableElement;

    // Convert table data to CSV format
    const csv = convertToCSV(table);

    // Create Blob object
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a link element to initiate download
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Create URL for Blob object
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  
}
