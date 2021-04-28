import OrderItem from './OrderItem';

export default class Order {
  constructor(items: OrderItem[]) {
    this.items = items;
  }
  items: OrderItem[];
}