import * as fieldNames from '../../constants/field-names';
import {Item} from './item';
export class Order{
  orderId: string|Number;
  orderStatus: string;
  orderRelayTime: string;
  orderAcceptanceTime: string;
  orderDeliveryTime: string;
  totalBillAmount: number;
  taxRestaurant: number;
  itemSGST: number;
  itemCGST: number;
  itemIGST: number;
  packingChargeSGST: number;
  packingChargeCGST: number;
  packingChargeIGST: number;
  serviceChargeSGST: number;
  serviceChargeCGST: number;
  serviceChargeIGST: number;
  itemGSTInclusive: string;
  packagingGSTInclusive: string;
  serviceChargeGSTInclusive: string;
  restauranTradeDiscount: number;
  restaurantCouponDiscountShare: number;
  packingCharge: number;
  canceledReason: string;
  foodPrepared: string;
  orderCancellationTime: string;
  editedStatus: string;
  itemCount: number;
  mouType: string;
  cancellationResposibleEntity: String;
  restaurantBear: Number;
  totalPrice: Number;
  items : Item[];

  constructor(orderData: *, taxRates: *) {
    this.orderId = orderData[fieldNames.orderNoKey];
    this.orderStatus = orderData[fieldNames.orderStatusKey];
    this.orderRelayTime = orderData[fieldNames.orderRelayTimeKey];
    this.orderAcceptanceTime = orderData[fieldNames.orderAcceptanceTimeKey];
    this.orderDeliveryTime = orderData[fieldNames.orderDeliveryTimeKey];
    this.totalBillAmount = Number(orderData[fieldNames.totalBillAmountKey]);
    this.taxRestaurant = Number(orderData[fieldNames.taxRestaurantKey]);
    this.itemSGST = Number(orderData[fieldNames.itemSGSTKey]);
    this.itemCGST = Number(orderData[fieldNames.itemCGSTKey]);
    this.itemIGST = Number(orderData[fieldNames.itemIGSTKey]);
    this.packingChargeSGST = Number(orderData[fieldNames.packingChargeSGSTKey]);
    this.packingChargeCGST = Number(orderData[fieldNames.packingChargeCGSTKey]);
    this.packingChargeIGST = Number(orderData[fieldNames.packingChargeIGSTKey]);
    this.serviceChargeSGST = Number(orderData[fieldNames.serviceChargeSGSTKey]);
    this.serviceChargeCGST = Number(orderData[fieldNames.serviceChargeCGSTKey]);
    this.serviceChargeIGST = Number(orderData[fieldNames.serviceChargeIGSTKey]);
    this.itemGSTInclusive = orderData[fieldNames.itemGSTInclusiveKey];
    this.packagingGSTInclusive = orderData[fieldNames.packagingGSTInclusiveKey];
    this.serviceChargeGSTInclusive = Number(orderData[fieldNames.serviceChargeGSTInclusiveKey]);
    this.restauranTradeDiscount = Number(orderData[fieldNames.restauranTradeDiscountKey]);
    this.packingCharge = Number(orderData[fieldNames.packingChargeKey]);
    this.canceledReason = orderData[fieldNames.canceledReasonKey];
    this.foodPrepared = orderData[fieldNames.foodPreparedKey];
    this.orderCancellationTime = orderData[fieldNames.orderCancellationTimeKey];
    this.editedStatus = orderData[fieldNames.editedStatusKey];
    this.itemCount = Number(orderData[fieldNames.itemCountKey]);
    this.mouType = orderData[fieldNames.mouTypeKey];
    this.cancellationResposibleEntity = orderData[fieldNames.cancellationResposibleEntityKey];
    this.restaurantBear = orderData[fieldNames.restaurantBearKey];

    const itemStrings = this.getItemStrings(orderData);
    this.items = itemStrings.map(itemString => new Item(itemString, taxRates));
    
  }

  getItemStrings(orderData: *){
    const itemStartKey = fieldNames.itemStartKey;  
    const keys = Object.keys(orderData);
    const itemStartIndex = keys.indexOf(itemStartKey);
    let itemStrings =[];
    let itemIndex;
    for(itemIndex = 0; itemIndex < this.itemCount; itemIndex++){
      itemStrings.push(orderData[keys[itemStartIndex + itemIndex]]);
    }
    return itemStrings;
  }

}