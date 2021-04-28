import Assignment from '../models/Assignment';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Pharmacy from '../models/Pharmacy';
import collectAssignmentsForOrderItem from './collectAssignmentsForOrderItem';

/**
 * Limitations: throws errors when order is not fulfillable
 * @param pharmacies
 * @param order an order whose items are unique by drug, no two order items are for the same drug
 * @returns
 */
export default function assignOrderToPharmacies(
  pharmacies: Pharmacy[],
  order: Order
): Assignment[] {
  const { items: orderItems } = order;

  // as a method of adding data to an object without modifying it
  // keys here are pharmacies
  // values will be the items
  const pharmacyItemMap = new WeakMap();
  pharmacies.forEach((pharmacy) => {
    pharmacyItemMap.set(pharmacy, []);
  });

  orderItems.forEach((workingOrderItem: OrderItem) => {
    const workingOrderItemAssignments: Assignment[] = collectAssignmentsForOrderItem(
      workingOrderItem,
      pharmacies
    );
    // for every assignment result (atm each has 1 item) add that item to the map of pharmacies to items
    // assignments are just a useful construct for passing this data, these are kinda "partial assignments"
    workingOrderItemAssignments.forEach((assignment: Assignment) => {
      const { pharmacy, items } = assignment;
      const currentItems = pharmacyItemMap.get(pharmacy);
      pharmacyItemMap.set(pharmacy, [...currentItems, ...items]);
    });
  });

  // turn our weakmap into an array of assignments
  return pharmacies.map((pharmacy: Pharmacy) => {
    const items = pharmacyItemMap.get(pharmacy);
    return new Assignment(items, pharmacy);
  });
}
