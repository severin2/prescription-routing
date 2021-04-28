import { Drug } from './Drug';

export default class InventoryItem {
  constructor(drug: Drug, cost: number) {
    this.drug = drug;
    this.cost = cost;
  }
  drug: Drug;
  // TODO enforce dollar amount, or store as cents, enforce non-negative
  cost: number;
}