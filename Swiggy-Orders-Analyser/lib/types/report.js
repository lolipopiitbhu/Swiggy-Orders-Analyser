import {Order} from './order';
import {Item} from './item';
import {TaxItem} from './tax-item';
import * as orderStatus from '../../constants/order-status';

export class Report{
  orders: *;

  constructor(data: *, taxRates: *){
    this.orders = this.getOrders(data, taxRates);
  }

  getOrders(data: *, taxRates: *){
    return data.map(order => new Order(order, taxRates));
  }

  getDeliveredOrders(){
    return this.orders.filter(order => order.orderStatus === orderStatus.DELIVERED);
  }

  getCancelledOrders(){
    return this.orders.filter(order => order.orderStatus === orderStatus.CANCELLED);
  }

  getFailedOrders(){
    return this.orders.filter(order => order.orderStatus === orderStatus.FAILED);
  }

  getProducts(orders: *){
    //TODO make hashmap for products
    if(!orders){
      orders = this.orders;
    }
    let products = [];
    orders.forEach(order => {
      order.items.forEach(item => {
        let flag = 0;
        products.forEach(p => {
          if(p.name === item.name){
            p.quantity = p.quantity + item.quantity;
            flag = 1;
          }
        });
        if(!flag){
          products.push(item);
        }
      });
    });

    return products;
  }

  getTax(){
    const deliveredOrders = this.getDeliveredOrders();
    const products = this.getProducts(deliveredOrders);
    //TODO add hashmap for taxItems
    let taxItems =[];
    products.forEach(product => {
      let flag = 0;
      taxItems.forEach(tax => {
        if(tax.rate === product.taxRate){
          tax.amount = tax.amount + product.price;
          flag = 1;
        }
      });
      if(!flag){
        taxItems.push(new TaxItem(product.taxRate, product.price))
      }
    });

    return taxItems;
    
  }


}


