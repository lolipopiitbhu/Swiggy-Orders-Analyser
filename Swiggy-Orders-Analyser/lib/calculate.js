import { Report } from './types/report';
import ordersData from './data/orders.json';
import taxRates from './data/tax-rates.json';
export function calculate(){
  const report = new Report(ordersData, taxRates);
  const orders = report.orders;
  const products = report.getProducts();
  const tax = report.getTax();
  console.log(tax);
}
