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
    // returns list of products in given array of orders
    // if orders is not defined, gives all products from all orders
    // Note: price might be misleading if price of same item was changed
    // amount will give total amount that was collected from product for given orders
    //TODO make hashmap for products
    if(!orders){
      orders = this.orders;
    }
    let products = [];
    let flag;
    let a;

    orders.forEach(order => {
      order.items.forEach(item =>{
        flag = 0;
        products.forEach(p =>{
          if(p.name === item.name){
            p.quantity = p.quantity + item.quantity;
            p.amount = p.amount + item.amount;
            flag = 1;
          }
        });
        if(!flag){
          a = {...item};
          products.push(a);
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
    let flag;
    products.forEach(product => {
      flag = 0;
      taxItems.forEach(tax => {
        if(tax.rate === product.taxRate){
          tax.amount = tax.amount + product.amount;
          tax.products.push(product);
          flag = 1;
        }
      });
      if(!flag){
        taxItems.push(new TaxItem(product.taxRate, product.amount, [product]));
      }
    });

    return taxItems;
    
  }

  getTaxRateUnavailableItems(products: *){
    //included items in cancelled and failed orders
    if(!products){
      products = this.getProducts();
    }
    const taxRateUnavailableItems = products.filter(product => product.taxRate === -1);
    const taxRateUnavailableNames = taxRateUnavailableItems.map(item => item.name);
    return taxRateUnavailableNames;
  }

  getTaxItemByRate(rate: number){
    const taxItems = this.getTax();
    return taxItems.find(taxItem => taxItem.rate === rate);
  }

  getOrderDetailsById(id: string|number){
    this.orders.find(order => String(order.orderId) === String(id));
  }

  validateAllOrders(orders: *){
    if(!orders){
      orders = this.orders;
    }
    return orders.reduce((validate, order) => {
      return validate && order.validateOrder();
    },true);
  }

  getInvalidOrders(orders: *){
    if(!orders){
      orders = this.orders;
    }
    return orders.reduce((invalidOrders, order) => {
      if(!order.validateOrder()){
        const invalidId = order.orderId;
        invalidOrders.push(invalidId);
      }
      return invalidOrders;
    },[]);
  }


}


