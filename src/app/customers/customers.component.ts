import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../shared/services/customers.service';
import { Customer } from '../shared/services/customer';

const emptyCustomer: Customer = {
  id: null,
  name: '',
  description: '',
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers = [];
  selectedCustomer = emptyCustomer;
  originalName = '';

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  selectCustomer(customer) {
    this.selectedCustomer = customer;
  }

  fetchCustomers() {
    this.customersService
      .all()
      .subscribe((result: any) => (this.customers = result));
  }

  saveCustomer(customer) {
    if (customer.id) {
      this.updateCustomer(customer);
    } else {
      this.createCustomer(customer);
    }
  }

  createCustomer(customer) {
    this.customersService
      .create(customer)
      .subscribe((result) => this.fetchCustomers());
  }

  updateCustomer(customer) {
    this.customersService
      .update(customer)
      .subscribe((result) => this.fetchCustomers());
  }

  deleteCustomer(customerId) {
    console.log('Delete Customer', customerId);
  }

  reset() {
    this.selectCustomer({ ...emptyCustomer });
  }
}
