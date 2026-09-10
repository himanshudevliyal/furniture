import { FileQuestion, LayoutDashboard, User, Users } from "lucide-react";

export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

export const sidebarData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
  {
    title: "Users",
    url: "/users?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/users/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/users/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Categories",
    url: "/categories?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/categories/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/categories/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Sub Categories",
    url: "/sub-categories?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/sub-categories/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/sub-categories/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Products",
    url: "/products?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/products/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/products/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Orders",
    url: "/orders?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/orders/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/orders/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Queries",
    url: "/queries?page=1&limit=10",
    icon: FileQuestion,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "View",
        url: "/queries/:id",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Profile Overview",
    url: "/profile",
    icon: User,
    roles: [],
    isVisible: true,
    items: [],
  },
];

export const publicRoutes = ["/", "/admin", "/register", "/accept-invite"];
