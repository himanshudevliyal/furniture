"use strict";
import orderItemModel from "./models/order-item.model.js";
import orderModel from "./models/order.model.js";
import paymentModel from "./models/payment.model.js";
import userModel from "./models/user.model.js";
import productModel from "./models/product.model.js";
import cartModel from "./models/cart.model.js";
import userAddressModel from "./models/user-address.model.js";
import inventoryModel from "./models/inventory.model.js";
import categoryModel from "./models/category.model.js";
import subCategoryModel from "./models/sub-category.model.js";
import queryModel from "./models/query.model.js";
import productInquiryModel from "./models/product-inquiry.model.js";

export default {
  UserModel: userModel,
  CategoryModel: categoryModel,
  SubCategoryModel: subCategoryModel,
  ProductModel: productModel,
  OrderModel: orderModel,
  OrderItemModel: orderItemModel,
  PaymentModel: paymentModel,
  CartModel: cartModel,
  UserAddressModel: userAddressModel,
  InventoryModel: inventoryModel,
  QueryModel: queryModel,
  ProductInquiryModel: productInquiryModel,
};
