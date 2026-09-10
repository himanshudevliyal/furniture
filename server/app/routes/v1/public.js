"use strict";

import { categoryPublicRoutes } from "../../api/category/routes.js";
import { subCategoryPublicRoutes } from "../../api/sub-category/routes.js";
import { paymentPublicRoutes } from "../../api/payment/routes.js";
import { productPublicRoutes } from "../../api/product/routes.js";
import { queryPublicRoutes } from "../../api/query/routes.js";

export default async function routes(fastify, options) {
  fastify.register(productPublicRoutes, { prefix: "products" });
  fastify.register(categoryPublicRoutes, { prefix: "categories" });
  fastify.register(subCategoryPublicRoutes, { prefix: "sub-categories" });
  fastify.register(queryPublicRoutes, { prefix: "queries" });
  fastify.register(paymentPublicRoutes, { prefix: "payments" });
}
