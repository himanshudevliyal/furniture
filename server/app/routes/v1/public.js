"use strict";

import { categoryPublicRoutes } from "../../api/category/routes.js";
import { subCategoryPublicRoutes } from "../../api/sub-category/routes.js";
import { paymentPublicRoutes } from "../../api/payment/routes.js";
import { productPublicRoutes } from "../../api/product/routes.js";
import { queryPublicRoutes } from "../../api/query/routes.js";
import { productInquiryPublicRoutes } from "../../api/product-inquiry/routes.js";
import uploadFilesRoutes from "../../api/upload_files/routes.js";

export default async function routes(fastify, options) {
  fastify.register(productPublicRoutes, { prefix: "products" });
  fastify.register(categoryPublicRoutes, { prefix: "categories" });
  fastify.register(subCategoryPublicRoutes, { prefix: "sub-categories" });
  fastify.register(queryPublicRoutes, { prefix: "queries" });
  fastify.register(productInquiryPublicRoutes, { prefix: "product-inquiries" });
  fastify.register(paymentPublicRoutes, { prefix: "payments" });
  fastify.register(uploadFilesRoutes, { prefix: "upload" });
}
