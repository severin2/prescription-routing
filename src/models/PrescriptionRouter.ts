import assignOrderToPharmacies from '../services/assignOrderToPharmacies';
import Assignment from './Assignment';
import Order from './Order';
import Pharmacy from './Pharmacy';

export default class PrescriptionRouter {
  constructor(pharmacies: Pharmacy[]) {
    this.pharmacies = pharmacies;
  }
  pharmacies: Pharmacy[];

  /**
   * AC: the router has an assign function
   * @param order 
   * @returns 
   */
  assign(order: Order): Assignment[] {
    return assignOrderToPharmacies(this.pharmacies, order);
  }
}
