import InventoryItem from '../models/InventoryItem';
import OrderItem from '../models/OrderItem';
import Pharmacy from '../models/Pharmacy';

/**
 * The cost to fulfill this order and the quantity provided (may not be the count for that drug at that pharmacy)
 * 
 * @param pharmacy
 * @param orderItem
 */
export default function estimatePharmacyOrderItemCost(
  pharmacy: Pharmacy,
  orderItem: OrderItem
): { cost: number, quantity: number } {
  let costSoFar = 0;
  let quantitySoFar = 0;
  for (let i = 0; i < pharmacy.inventory.length; i += 1) {
    const inventoryItem: InventoryItem = pharmacy.inventory[i];
    if (inventoryItem.drug === orderItem.drug) {
      quantitySoFar += 1;
      costSoFar += inventoryItem.cost;
    }

    if (quantitySoFar >= orderItem.quantity) {
      return { cost: costSoFar, quantity: quantitySoFar};
    }
  }
  return { cost: costSoFar, quantity: quantitySoFar};
}
