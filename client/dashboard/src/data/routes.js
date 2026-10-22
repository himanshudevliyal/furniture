import {
  Briefcase,
  ClipboardList,
  FileQuestion,
  FileText,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";

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
  title: "Blogs",
  url: "/blogs?page=1&limit=10",
  icon: Users,
  roles: [ROLES.ADMIN],
  isVisible: true,
  items: [
    {
      title: "Create",
      url: "/blogs/create",
      roles: [ROLES.ADMIN],
      isVisible: true,
    },
    {
      title: "Edit",
      url: "/blogs/:id/edit",
      roles: [ROLES.ADMIN],
      isVisible: false,
    },
  ],
},

  {
    title: "Product Inquiries",
    url: "/product-inquiries?page=1&limit=10",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "View",
        url: "/product-inquiries/:id",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
      {
        title: "Edit",
        url: "/product-inquiries/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Project Quotes",
    url: "/project-quotes?page=1&limit=10",
    icon: FileText,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "View",
        url: "/project-quotes/:id",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
      {
        title: "Edit",
        url: "/project-quotes/:id/edit",
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
      {
        title: "Edit",
        url: "/queries/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Jobs",
    url: "/jobs?page=1&limit=10",
    icon: Briefcase,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/jobs/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/jobs/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Job Applications",
    url: "/job-applications?page=1&limit=10",
    icon: ClipboardList,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "View",
        url: "/job-applications/:id",
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
