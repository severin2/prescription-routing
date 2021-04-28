import OrderItem from './OrderItem';
import Pharmacy from './Pharmacy';

export default class Assignment {
  constructor(items: OrderItem[], pharmacy: Pharmacy) {
    this.items = items;
    this.pharmacy = pharmacy;
  }
  items: OrderItem[];
  pharmacy: Pharmacy;
}
