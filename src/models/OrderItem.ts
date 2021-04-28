import { Drug } from './Drug';

export default class OrderItem {
  constructor(drug: Drug, quantity: number) {
    this.drug = drug;
    this.quantity = quantity;
  }
  drug: Drug;
  // TODO enforce natural numbers, integers greater than zero
  quantity: number;
}