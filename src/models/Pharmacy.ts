import estimatePharmacyOrderItemCost from '../services/estimatePharmacyOrderItemCost';
import InventoryItem from './InventoryItem';
import OrderItem from './OrderItem';

export default class Pharmacy {
  constructor(inventory: InventoryItem[]) {
    this.inventory = inventory;
  }

  inventory: InventoryItem[];

  // AC: Pharmacy has a function to estimate the cost of an order
  estimateOrderItemCost(orderItem: OrderItem): number {
    const { cost } = estimatePharmacyOrderItemCost(this, orderItem);
    return cost;
  }
}