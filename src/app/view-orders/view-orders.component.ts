import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PurchaseOrder} from '../purchase-order';
import {PurchaseOrderService} from '../purchase-order-service.service';
import {SupplierService} from '../services/supplier.service';
import {ItemService} from '../services/item.service';
import {PurchaseOrderResponse} from '../models/purchase-order-response';
import {Supplier} from '../classes/supplier';
import {Item} from '../classes/item';
import {UpdatePurchaseOrderRequest} from '../models/update-purchase-order-request';
import {Notification} from '../classes/notification';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';
import {ManagerBudget} from '../classes/manager-budget-class';
import {ManagerBudgetServiceService} from '../services/manager-budget-service.service';
import {Site} from '../classes/site';
import {SiteService} from '../services/site.service';

declare var $: any;

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  purchaseOrderResponse: PurchaseOrderResponse[];
  supplierResponse: Supplier[];
  selectedSupplier: String;
  viewSupplierDetails: Supplier;
  selectedPurchaseOrder: PurchaseOrder;
  updatedPurchaseOrder: UpdatePurchaseOrderRequest;
  selectedItems: Item[];
  itemResponse: Item[];
  changedItems: Item[];
  approvedOrderId: String;
  selectedItemName: String;
  supplierGroup: FormGroup;
  borderStyle: {"border": string};
  sendOrderDetails: PurchaseOrder;
  username: string;
  userType: string;
  sendNotification: Notification;
  message: string;
  isNotificationSent: boolean;
  isUpdated: boolean;
  assignedBudgets: ManagerBudget[];
  isValidCost: boolean;
  filter: string;
  shownCount: number;
  isValidSupplier: boolean;
  siteList: Site[];
  selectedSite: {siteId: string, siteName: string, budget: number};

  constructor(private purchaseOrderService: PurchaseOrderService, private supplierService: SupplierService, private itemService: ItemService, private notificationService: NotificationService, private budgetService: ManagerBudgetServiceService, private siteService: SiteService, private router: Router) {

  }

  ngOnInit() {

    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');

    if (this.username === null) {
      this.router.navigate(['login']);
    }

    this.getAllPurchaseOrders();
    this.getAllSuppliers();
    this.getAllItems();
    this.getAllBudgets();
    this.getAllSites();



    this.changedItems = [];
    this.selectedPurchaseOrder = <PurchaseOrder>{};
    this.updatedPurchaseOrder = <UpdatePurchaseOrderRequest>{};
    this.viewSupplierDetails = <Supplier>{};
    this.borderStyle = {
      border: "none"
    };

    this.sendOrderDetails = <PurchaseOrder>{};
    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');
    this.sendNotification = <Notification>{};
    this.sendNotification.purchaseOrder = <PurchaseOrder>{};
    this.message = '';
    this.isNotificationSent = false;
    this.isUpdated = false;
    this.assignedBudgets = [];
    this.isValidCost = true;
    this.filter = '';
    this.shownCount = 0;
    this.isValidSupplier = true;
    this.siteList = [];
    this.selectedSite = {
      siteId: '',
      siteName: '',
      budget: 0
    };
  }

  showModal(order: PurchaseOrderResponse) {
    this.selectedPurchaseOrder = order.purchaseOrder;
    this.selectedSupplier = order.purchaseOrder.supplierId;
    this.selectedItems = order.purchaseOrder.itemIdList;

    if (this.selectedPurchaseOrder.cost > 100000) {
      this.borderStyle.border = "1px solid red";
    }


    this.selectedItems.forEach(item => {
      this.itemResponse.forEach(realItem => {
        if (realItem.itemId == item.itemId) {
          item.itemType = realItem.itemType;
          item.itemMetric = realItem.itemMetric;
        }
      });
    });
  }

  approveOrder(order: PurchaseOrderResponse) {
    var isApproved = confirm('Are you sure you want to approve this order?');
    this.selectedPurchaseOrder = order.purchaseOrder;
    this.selectedSupplier = order.purchaseOrder.supplierId;
    this.selectedItems = order.purchaseOrder.itemIdList;

    if (isApproved) {
      this.selectedPurchaseOrder.ordStatus = 'Approved';
      this.createNotification(order, 'SiteManager');
      this.editOrder();
      this.sendNotificationForSiteManager('Approved');
    }
  }

  rejectOrder(order: PurchaseOrderResponse) {
    var isRejected = confirm('Are you sure you want to reject this order?');
    this.selectedPurchaseOrder = order.purchaseOrder;
    this.selectedSupplier = order.purchaseOrder.supplierId;
    this.selectedItems = order.purchaseOrder.itemIdList;

    if (isRejected) {
      this.selectedPurchaseOrder.ordStatus = 'Rejected';
      this.createNotification(order, 'SiteManager');
      this.editOrder();
      this.sendNotificationForSiteManager('Rejected');
    }
  }

  changeQuantities(item: Item) {
    var isFound;
    var qty = item.itemQuantity;
    var price = 0;

    this.selectedPurchaseOrder.cost = 0;

    this.itemResponse.forEach(itemResponse => {
      this.selectedItems.forEach(selectedItem => {
        if (selectedItem.itemId === itemResponse.itemId) {

          if (selectedItem.itemId === item.itemId) {
            this.selectedPurchaseOrder.cost += item.itemQuantity * itemResponse.itemPrice;
          }
          else {
            this.selectedPurchaseOrder.cost += selectedItem.itemQuantity * itemResponse.itemPrice;
          }
        }
      })
    });

    if (this.selectedPurchaseOrder.cost > 100000) {
      this.borderStyle.border = "1px solid red";
    }
    else {
      this.borderStyle.border = "none";
    }


    if (this.changedItems.length == 0) {
      this.changedItems.push(item);
    }
    else {
      this.changedItems.forEach(realItem => {
        if (realItem.Id == item.itemId) {
          isFound = false;
        }
      });

      if (!isFound) {
        this.changedItems.push(item);
      }
    }

  }

  editOrder() {

    console.log('selected supplier is: ' + this.selectedSupplier);

    this.createUpdateRequest();

    this.purchaseOrderService.update(this.updatedPurchaseOrder).subscribe(result => {
      if (result) {
        this.isUpdated = true;
        setTimeout(() => {
          $('#editModal').modal('hide');
          this.isUpdated = false;
          this.getAllPurchaseOrders();
        }, 2000);
      }


    })
  }

  clearChangedItems() {
    this.changedItems.length = 0;
    this.borderStyle.border = "none";
    this.isValidSupplier = true;
  }

  getAllPurchaseOrders() {
    this.purchaseOrderService.findAll().subscribe(orders => {
      this.purchaseOrderResponse = orders;

      this.purchaseOrderResponse.forEach(order => {
        let parts = [];
        if (order.purchaseOrder.ordStatus === 'Approved') {
          this.approvedOrderId = order.purchaseOrder.ordId;
        }
        let date = order.purchaseOrder.ordDate.toString();
        parts = date.split("T");
        order.purchaseOrder.ordDate = parts[0];
      });
    });



  }

  getAllSuppliers() {
    this.supplierService.findAll().subscribe(suppliers => {
      this.supplierResponse = suppliers;
    });
  }

  getAllItems() {
    this.itemService.findAll().subscribe(items => {
      this.itemResponse = items;
    });
  }

  getAllBudgets() {
    this.budgetService.findAll().subscribe(budgets => {
      this.assignedBudgets = budgets;
    })
  }

  getAllSites() {
    this.siteService.findAll().subscribe(sites => {
      this.siteList = sites;
    })
  }

  createUpdateRequest() {
    this.updatedPurchaseOrder._id = this.selectedPurchaseOrder._id;
    this.updatedPurchaseOrder.ordId = this.selectedPurchaseOrder.ordId;
    this.updatedPurchaseOrder.ordType = this.selectedPurchaseOrder.ordType;
    this.updatedPurchaseOrder.ordStatus = this.selectedPurchaseOrder.ordStatus;
    this.updatedPurchaseOrder.companyName = this.selectedPurchaseOrder.companyName;
    this.updatedPurchaseOrder.deliveryAddress = this.selectedPurchaseOrder.deliveryAddress;
    this.updatedPurchaseOrder.ordDate = this.selectedPurchaseOrder.ordDate;
    this.updatedPurchaseOrder.deliveryDate = this.selectedPurchaseOrder.deliveryDate;
    this.updatedPurchaseOrder.itemIdList = this.changedItems.length == 0 ? this.selectedPurchaseOrder.itemIdList: this.changedItems;
    this.updatedPurchaseOrder.quantity = this.selectedPurchaseOrder.quantity;
    this.updatedPurchaseOrder.cost = this.selectedPurchaseOrder.cost;
    this.updatedPurchaseOrder.supplierId = this.selectedSupplier;
    this.updatedPurchaseOrder.siteId = this.selectedPurchaseOrder.siteId;
  }

  checkOrderStatus(order: PurchaseOrderResponse) {
    if (order.purchaseOrder.ordStatus === 'Approved' || order.purchaseOrder.ordStatus === 'Rejected' || order.purchaseOrder.ordStatus === 'Waiting for Approval') {
      return true;
    }
    else {
      return false;
    }
  }

  viewSupplier(order: PurchaseOrderResponse) {
    this.selectedSupplier = order.purchaseOrder.supplierId;

    this.supplierResponse.forEach(supplier => {
      if (supplier.supplierId === this.selectedSupplier) {
        this.viewSupplierDetails = supplier;
      }
    })
  }

  createNotification(order: PurchaseOrderResponse, type: string) {
    this.sendNotification.purchaseOrder = order.purchaseOrder;
    this.sendNotification.items = order.itemDetails;
    this.sendNotification.supplier = order.supplierDetails;
    this.sendNotification.receiverType = type;
    this.sendNotification.read = false;
  }

  sendForApproval(order: PurchaseOrderResponse) {
      this.createNotification(order, 'Manager');
    $("#sendPurchaseOrder").modal({backdrop: 'static', keyboard: false, show: true});
  }

  sendNotificationForManager() {
    this.sendNotification.sender = "Procurement";
    this.sendNotification.message = $('#description').val();
    this.sendNotification.purchaseOrder.ordStatus = 'Waiting for Approval';
    this.sendNotification.publishedDate = new Date();
    this.sendNotification.readDate = null;
    this.notificationService.save(this.sendNotification).subscribe(success => {
      if (success) {

        this.purchaseOrderService.update(this.sendNotification.purchaseOrder).subscribe(data => {
          if (data) {
            this.isNotificationSent = true;
            setTimeout(() => {
              $('#sendPurchaseOrder').modal('hide');
              this.isNotificationSent = false;
            },3000);

            this.getAllPurchaseOrders();
          }
        }, fail => {
          alert('purchase order: ' + fail);
        })
      }
    }, error => {
      alert('notification error: ' + error);
    });

  }

  sendNotificationForSiteManager(status: string) {
    let message = '';

    if (status === 'Approved') {
      message = 'Purchase Order ' + this.sendNotification.purchaseOrder.ordId + ' has been Approved by the Procurement staff';
    }
    else if (status === 'Rejected') {
      message = 'Purchase Order ' + this.sendNotification.purchaseOrder.ordId + ' has been Rejected by the Procurement staff';
    }

    this.sendNotification.sender = "Procurement";
    this.sendNotification.message = message;
    this.sendNotification.purchaseOrder.ordStatus = status;
    this.sendNotification.publishedDate = new Date();
    this.sendNotification.readDate = null;
    this.notificationService.save(this.sendNotification).subscribe(success => {
      if (success) {
        alert('Notification was sent successfully');
        this.getAllPurchaseOrders();
      }
    }, error => {
      alert('notification error: ' + error);
    });
  }

  checkOrderCost(order: PurchaseOrderResponse): boolean {
    return (order.purchaseOrder.cost > 100000);
  }

  checkBudget(order: PurchaseOrderResponse): boolean {
    var isValidCost = true;
    let siteId = order.purchaseOrder.siteId;
    let cost = order.purchaseOrder.cost;
    this.assignedBudgets.forEach(budget => {
      if (budget.siteId === siteId) {
        if (budget.siteBudget < cost) {
          isValidCost = false;
        }
      }
    });

    return isValidCost;
  }

  checkFilter(status: string): boolean {
    // this.shownCount = 0;
    if (this.filter === status || this.filter === '') {
      this.shownCount++;
      return true;
    } else {
      this.shownCount = 0;
      return false;
    }

  }

  supplierChange() {
    let isFound = false;
    this.supplierResponse.forEach(supplier => {
      if (this.selectedSupplier === supplier.supplierId) {
        supplier.itemList.forEach(item => {
          this.selectedItems.forEach(selected => {
            if (selected.itemType === item.itemType) {
              isFound = true;
            }
          });
        });
      }
    });

    this.isValidSupplier = isFound;
  }

  viewSite(siteId: string) {
    $("#view_site_modal").modal({backdrop: 'static', keyboard: false, show: true});

    this.assignedBudgets.forEach(budgets => {
      if (budgets.siteId === siteId) {
        this.selectedSite.siteId = siteId;
        this.selectedSite.budget = budgets.siteBudget;
      }
    });

    this.siteList.forEach(site => {
      if (site.siteId === siteId) {
        this.selectedSite.siteName = site.siteName;
      }
    })
  }

}
