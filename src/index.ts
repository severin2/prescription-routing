import { Drug } from './models/Drug';
import InventoryItem from './models/InventoryItem';
import Order from './models/Order';
import OrderItem from './models/OrderItem';
import Pharmacy from './models/Pharmacy';
import PrescriptionRouter from './models/PrescriptionRouter';
import assignOrderToPharmacies from './services/assignOrderToPharmacies';

function createTestRouter(): PrescriptionRouter {
  const inventoryA = [
    new InventoryItem(Drug.Antacid, 1),
    new InventoryItem(Drug.Antacid, 1.5),
    new InventoryItem(Drug.AntiBacterial, 1),
    new InventoryItem(Drug.AntiBacterial, 1.5),
    new InventoryItem(Drug.AntiInflammatory, 2),
    new InventoryItem(Drug.AntiInflammatory, 4),
    new InventoryItem(Drug.ColdRelief, 1),
    new InventoryItem(Drug.ColdRelief, 1.5),
    new InventoryItem(Drug.CoughSuppressant, 2.5),
    new InventoryItem(Drug.CoughSuppressant, 5),
    new InventoryItem(Drug.PainRelief, 4.5),
    new InventoryItem(Drug.PainRelief, 9),
  ];
  const pharmacyA = new Pharmacy(inventoryA);

  const inventoryB = [
    new InventoryItem(Drug.Antacid, 0.5),
    new InventoryItem(Drug.Antacid, 2),
    new InventoryItem(Drug.AntiBacterial, 4),
    new InventoryItem(Drug.AntiInflammatory, 6),
    new InventoryItem(Drug.PainRelief, 8),
  ];
  const pharmacyB = new Pharmacy(inventoryB);

  const inventoryC = [
    new InventoryItem(Drug.ColdRelief, 1),
    new InventoryItem(Drug.CoughSuppressant, 0.5),
    new InventoryItem(Drug.PainRelief, 0.5),
  ];
  const pharmacyC = new Pharmacy(inventoryC);

  const router = new PrescriptionRouter([pharmacyA, pharmacyB, pharmacyC]);

  return router;
}

function createTestOrder(): Order {
  const items = [
    new OrderItem(Drug.Antacid, 1),
    new OrderItem(Drug.CoughSuppressant, 1),
    new OrderItem(Drug.PainRelief, 1),
  ];
  const order = new Order(items);
  return order;
}

// on start
const router = createTestRouter();
const order = createTestOrder();
const assignments = assignOrderToPharmacies(router.pharmacies, order);
console.log('assignments', assignments);
