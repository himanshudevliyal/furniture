import jwtVerify from "../../helpers/auth.js";
import userRoutes from "../../api/users/routes.js";
import productRoutes from "../../api/product/routes.js";
import cartRoutes from "../../api/cart/routes.js";
import orderRoutes from "../../api/order/routes.js";
import reportRoutes from "../../api/reports/routes.js";
import addressRoutes from "../../api/address/routes.js";
import inventoryRoutes from "../../api/inventory/routes.js";
import categoryRoutes from "../../api/category/routes.js";
import subCategoryRoutes from "../../api/sub-category/routes.js";
import queryRoutes from "../../api/query/routes.js";
import productInquiryRoutes from "../../api/product-inquiry/routes.js";

export default async function routes(fastify, options) {
  fastify.addHook("onRequest", jwtVerify.verifyToken);
  // fastify.addHook("preHandler", async (request, reply) => {
  //   request.body && console.log("body", request.body);
  // });

  // routes
  fastify.register(userRoutes, { prefix: "users" });
  fastify.register(categoryRoutes, { prefix: "categories" });
  fastify.register(subCategoryRoutes, { prefix: "sub-categories" });
  fastify.register(productRoutes, { prefix: "products" });
  fastify.register(cartRoutes, { prefix: "carts" });
  fastify.register(orderRoutes, { prefix: "orders" });
  fastify.register(reportRoutes, { prefix: "reports" });
  fastify.register(addressRoutes, { prefix: "addresses" });
  fastify.register(inventoryRoutes, { prefix: "inventories" });
  fastify.register(queryRoutes, { prefix: "queries" });
  fastify.register(productInquiryRoutes, { prefix: "product-inquiries" });
}
