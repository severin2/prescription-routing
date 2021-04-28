import Assignment from '../models/Assignment';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Pharmacy from '../models/Pharmacy';
import estimatePharmacyOrderItemCost from './estimatePharmacyOrderItemCost';

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
  // keys: pharmacies
  // values: order items fulfilled by that pharmacy
  const pharmacyItemMap = new WeakMap<Pharmacy, OrderItem[]>();
  pharmacies.forEach((pharmacy: Pharmacy) => {
    pharmacyItemMap.set(pharmacy, []);
  });

  orderItems.forEach((orderItem: OrderItem) => {
    const pharmaciesThatCanFulfill = pharmacies
      .map((pharmacy: Pharmacy) => {
        const { cost, quantity } = estimatePharmacyOrderItemCost(
          pharmacy,
          orderItem
        );
        return { cost, quantity, pharmacy };
      })
      .filter(({ quantity }) => quantity >= orderItem.quantity)
      .sort((a, b) => a.cost - b.cost);

      if (pharmaciesThatCanFulfill.length < 1) {
        throw new Error(`cannot fulfill order item for drug ${orderItem.drug}, no pharmacy with sufficient quantity`);
      }

      // the pharmacy that can fulfill with the lowest price
      const { pharmacy } = pharmaciesThatCanFulfill[0];
      // the order items it is currently fulfilling
      const pharmacyItems = pharmacyItemMap.get(pharmacy);
      // add in this item as well
      pharmacyItemMap.set(pharmacy, [...pharmacyItems, orderItem]);
  });

  // turn our weakmap into an array of assignments
  return pharmacies.map((pharmacy: Pharmacy) => {
    const items = pharmacyItemMap.get(pharmacy);
    return new Assignment(items, pharmacy);
  });
}

