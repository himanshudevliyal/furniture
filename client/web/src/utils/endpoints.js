export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
  },
  profile: "/users/me",
  files: {
    getFiles: "/upload",
    deleteKey: "/upload/s3",
    preSignedUrl: "/upload/presigned-url",
    preSignedUrls: "/upload/presigned-urls",
  },
  carts: { getAll: "/carts" },
  orders: { getAll: "/orders" },
  addresses: { getAll: "/addresses" },
  categories: { getAll: "/categories" },
  products: { getAll: "/products" },
  stories: { getAll: "/stories" },
  users: { getAll: "/users" },
};
