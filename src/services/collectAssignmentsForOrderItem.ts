import Assignment from '../models/Assignment';
import OrderItem from '../models/OrderItem';
import Pharmacy from '../models/Pharmacy';
import estimatePharmacyOrderItemCost from './estimatePharmacyOrderItemCost';

/**
 * @param orderItem
 * @param pharmacies
 * @returns
 */
export default function collectAssignmentsForOrderItem(
  orderItem: OrderItem,
  pharmacies: Pharmacy[]
): Assignment[] {
  // an array we can remove items from without mutating arguments
  const workingPharmacies = [...pharmacies];
  const assignments: Assignment[] = [];
  let achievedQuantity = 0;
  const targetQuantity = orderItem.quantity;

  // ordered so that we prefer to start with pharmacy 0
  const pharmacyCostsAndQuantities = pharmacies
    .map((pharmacy: Pharmacy) => {
      const { cost, quantity } = estimatePharmacyOrderItemCost(
        pharmacy,
        orderItem
      );
      return { cost, quantity, pharmacy };
    })
    .sort((a, b) => {
      // A earlier, negative
      // A later, positive
      // same

      // both has some of this drug
      if (a.quantity > 0 && b.quantity > 0) {
        return a.cost - b.cost;
      }
      // a has some, b did not
      else if (a.quantity > 0) {
        return -1;
      }
      // b has some, a did not
      else if (b.quantity > 0) {
        return 1;
      }

      return 0;
    });

  for (let i = 0; i < pharmacyCostsAndQuantities.length; i += 1) {
    const nextLowestPricePharmacy = pharmacyCostsAndQuantities[i];
    achievedQuantity += nextLowestPricePharmacy.quantity;
    assignments.push(
      new Assignment([orderItem], nextLowestPricePharmacy.pharmacy)
    );
    if (achievedQuantity >= targetQuantity) {
      return assignments;
    }
  }

  return assignments;
}
