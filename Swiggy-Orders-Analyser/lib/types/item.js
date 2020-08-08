import {INVALID_ITEM_STRING, TAX_ITEM_NOT_FOUND} from '../../constants/error-codes';
export class Item{
  name: String;
  amount: Number;
  quantity: Number;
  taxRate: Number;

  constructor(itemString: string, taxRates: *){
    const segments = itemString.split("_");
    if(segments.length != 4){
      throw HTTPError(400,INVALID_ITEM_STRING);
    }

    this.name = segments[0];
    this.quantity = Number(segments[2]);
    this.amount = Number(segments[3]);

    const taxRateMap = taxRates.Sheet1;
    const taxItem  = taxRateMap.find(item => item.itemName === this.name);
    if(!taxItem){
      //throw HTTPError(404,TAX_ITEM_NOT_FOUND, this.name);
      this.taxRate = -1;
      return this;
    }
    this.taxRate = Number(taxItem.taxRate);
  }
}