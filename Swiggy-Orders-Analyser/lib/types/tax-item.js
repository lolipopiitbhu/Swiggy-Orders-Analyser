export class TaxItem{
  rate: Number;
  amount: Number;

  constructor(taxRate: Number, taxAmount: Number){
    this.rate = taxRate;
    this.amount = taxAmount;
  }
}