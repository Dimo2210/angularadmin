// src/app/orders/orders.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  currentStatus: string = 'New'; // Default status
  searchQuery: string = ''; // Search query
  orders = [
    // Example orders array, replace with your actual data
    { id: 1, status: 'New' },
    { id: 2, status: 'Pending' },
    { id: 3, status: 'Completed' },
    { id: 4, status: 'New' },
    { id: 5, status: 'Pending' }
  ];
  filteredOrders = [];

  ngOnInit() {    
  }

  switchStatus(status: string) {
    this.currentStatus = status;

  }

}
