export class TaxItem{
  rate: Number;
  amount: Number;
  products: *[];

  constructor(taxRate: Number, taxAmount: Number, products: *){
    this.rate = taxRate;
    this.amount = taxAmount;
    this.products = products;
  }
}