"use strict";

import { randomUUID } from "node:crypto";
import constants from "../app/lib/constants/index.js";

// Modura — panel-based workstation system (Desk & Table → Panel).
// Images, 3D models and downloads are left empty (upload from the dashboard).
//
// Safe to re-run: skipped if the slug already exists.

const CATEGORY_ID = "2951e6e9-fbd5-45d1-960d-2c4ff46c3ca8"; // Desk & Table
const SUB_CATEGORY_ID = "c163c740-7aed-424c-94d4-8210cae31a9f"; // Panel

const SLUG = "modura-panel-workstation";

const section = (heading, text, list = []) => ({
  heading,
  descriptions: [text],
  image: "",
  has_features: list.length > 0,
  features: { heading: "", list },
});
const swatches = (heading, names) => ({
  heading,
  items: names.map((title) => ({ title, image: "" })),
});

const product = {
  title: "Modura Panel Workstation",
  slug: SLUG,
  short_description:
    "A panel-based workstation system with multiple panel thicknesses and finishes — built to turn open offices into flexible, well-organised workspaces.",

  hero: {
    heading: "Modura",
    subheading: "Simple, modern workstations — with room for choice and colour.",
    descriptions: [
      "Modura brings together multiple panel thicknesses, sizes and finishes so every team gets a workspace that fits the way it works.",
    ],
    images: [],
  },

  overview: {
    heading: "Focus and Teamwork, Side by Side",
    descriptions: [
      "Modura helps you plan offices where focused work and collaboration sit comfortably together. A choice of panel sizes lets you decide exactly how much privacy each desk gets.",
      "From compact linear rows to 120° clusters, the system adapts to your floor plan while keeping a clean, consistent look across the whole office.",
    ],
    image: "",
    features: {
      heading: "Features & Options",
      list: [
        "Multiple panel heights, thicknesses and finishes",
        "Precision-engineered joinery for clean alignment",
        "Screen doubles as a privacy panel and writing board",
        "Built-in wire management",
        "L-shape, 120°, linear and back-to-back layouts",
      ],
    },
  },

  details: {
    banner: { image: "" },
    sections: [
      section(
        "Engineered to Fit Together",
        "Precision-made joinery lets panels connect in many combinations while staying perfectly aligned. Every configuration gets the same neat, finished edges — whether you plan four desks or forty.",
        [
          "Seamless panel-to-panel alignment",
          "Clean finish across all configurations",
          "Easy to expand or reconfigure later",
        ],
      ),
      section(
        "One Screen, Two Jobs",
        "The desk screen gives each person visual privacy, and its surface can also be used as a writing board for quick notes, plans and ideas.",
      ),
      section(
        "Cables Out of Sight",
        "An integrated wire management system routes power and data cables neatly through the workstation, keeping desks clutter-free while leaving every connection easy to reach.",
      ),
      section(
        "Made to Match Your Space",
        "Choose panel colours, materials and finishes to suit your brand and interiors — from warm wood laminates to bright powder-coated frames and soft fabric screens.",
        ["7 laminate finishes", "6 powder-coat colours", "10 fabric options"],
      ),
    ],
  },

  features: {
    heading: "Features & Options",
    items: [
      {
        title: "Engineered Joinery",
        description:
          "Panels lock together in many combinations with seamless alignment and a clean finish.",
        image: "",
      },
      {
        title: "Multi-Purpose Screen",
        description: "Works as a privacy panel and a writing board in one.",
        image: "",
      },
      {
        title: "Integrated Wire Management",
        description:
          "Keeps cables organised and out of sight, with easy access when you need it.",
        image: "",
      },
      {
        title: "Customisable Finishes",
        description:
          "Pick panel colours, materials and finishes to match your workplace.",
        image: "",
      },
    ],
  },

  materials: {
    sections: [
      swatches("Laminates", [
        "Moldau Acacia Dark",
        "Elegant Teak",
        "Thansau Maple",
        "Highland Pine",
        "Slate Grey",
        "Gothic Grey",
        "Frosty White",
      ]),
      swatches("Powder Coating", [
        "Light Blue",
        "Sea Green",
        "Orange",
        "Graphite Grey",
        "Misty Grey",
        "White",
      ]),
      swatches(
        "Fabrics",
        Array.from({ length: 10 }, (_, i) => `Fabric ${i + 1}`),
      ),
    ],
  },

  specifications: [
    { label: "Panel Height", value: "1200 mm" },
    { label: "L-Shape — Length (L1 / L2)", value: "1200 / 1350 / 1500 mm" },
    { label: "L-Shape — Depth (D1 / D2)", value: "600 / 750 mm" },
    { label: "120° Cluster — Length (L1 / L2)", value: "1050 / 1200 mm" },
    { label: "120° Cluster — Depth (D1 / D2)", value: "600 mm" },
    { label: "Back-to-Back Linear — Length", value: "900 / 1050 / 1200 / 1350 / 1500 mm" },
    { label: "Back-to-Back Linear — Depth", value: "600 mm (per side)" },
    { label: "Non-Sharing Linear — Length", value: "900 / 1050 / 1200 / 1350 / 1500 mm" },
    { label: "Non-Sharing Linear — Depth", value: "600 mm" },
    { label: "Wire Management", value: "Integrated" },
    { label: "Finishes", value: "Laminate, powder coat, fabric" },
    { label: "Warranty", value: "Up to 10 years" },
  ],

  faqs: [
    {
      question: "Which layouts are available in Modura?",
      answer:
        "Modura comes in L-shape, 120° cluster, back-to-back linear and non-sharing linear layouts, so it fits both small teams and large open offices.",
    },
    {
      question: "What sizes can I choose?",
      answer:
        "Linear desks come in 900 to 1500 mm lengths, L-shape desks in 1200 to 1500 mm, and 120° clusters in 1050 or 1200 mm. Depth is 600 mm or 750 mm depending on the layout.",
    },
    {
      question: "How tall are the panels?",
      answer:
        "The standard panel height is 1200 mm, which gives good privacy while keeping the office open and connected.",
    },
    {
      question: "Can the finishes be customised?",
      answer:
        "Yes. You can choose from 7 laminates, 6 powder-coat colours and 10 fabric options, or ask us for a custom finish to match your interiors.",
    },
    {
      question: "How are cables managed?",
      answer:
        "Modura has built-in wire management that routes power and data cables neatly through the workstation, keeping desks clean and easy to maintain.",
    },
    {
      question: "Can I add more desks later?",
      answer:
        "Yes. The modular joinery lets you extend or reconfigure your layout as your team grows.",
    },
    {
      question: "What warranty do you offer?",
      answer:
        "Modura is backed by Natraj Furniture's comprehensive warranty of up to 10 years.",
    },
  ],

  // "Other Details" tab (rich text).
  content: [
    "<h3>Why choose Modura?</h3>",
    "<p>Modura is a modular, panel-based workstation system designed for modern offices that need to balance privacy and collaboration. Its engineered joinery, multi-purpose screens and built-in wire management make it practical for daily use, while a wide range of finishes lets it match any interior.</p>",
    "<ul><li>Ideal for corporate offices, IT companies, co-working spaces and banks</li><li>Easy to expand as your team grows</li><li>Bulk and project orders welcome</li></ul>",
    "<h3>Warranty</h3>",
    "<p>Backed by Natraj Furniture's comprehensive warranty of up to 10 years, for lasting quality, reliability and peace of mind.</p>",
    "<h3>Built Responsibly</h3>",
    "<p>Made with eco-friendly materials and sustainable practices that reduce environmental impact while ensuring long-lasting durability.</p>",
  ].join(""),

  meta_title: "Modura Panel Workstation | Modular Office Workstations – Natraj Furniture",
  meta_description:
    "Modura by Natraj Furniture is a modular panel-based workstation with L-shape, 120°, linear and back-to-back layouts, built-in wire management and custom laminate, powder-coat and fabric finishes.",
  meta_keywords:
    "panel workstation, modular office workstation, office partition system, L-shape workstation, linear workstation, back to back workstation, 120 degree workstation, Natraj Furniture",
};

export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  const table = constants.models.PRODUCT_TABLE;

  const [[sub]] = await sequelize.query(
    `SELECT id FROM ${constants.models.SUB_CATEGORY_TABLE}
     WHERE id = :sub AND category_id = :cat`,
    { replacements: { sub: SUB_CATEGORY_ID, cat: CATEGORY_ID } },
  );
  if (!sub) {
    throw new Error(
      `Sub-category ${SUB_CATEGORY_ID} under category ${CATEGORY_ID} not found — create it first.`,
    );
  }

  const [[existing]] = await sequelize.query(
    `SELECT id FROM ${table} WHERE slug = :slug`,
    { replacements: { slug: SLUG } },
  );
  if (existing) {
    console.log(`  ↷ skipped (already exists): ${SLUG}`);
    return;
  }

  const json = {
    hero: product.hero,
    overview: product.overview,
    details: product.details,
    features: product.features,
    faqs: product.faqs,
    specifications: product.specifications,
    materials: product.materials,
    models_3d: [],
    downloads: [],
    gallery: { heading: "", images: [] },
    colors: [],
  };

  await sequelize.query(
    `INSERT INTO ${table}
      (id, slug, title, short_description, category_id, sub_category_id,
       is_active, sort_order, content, thumbnail,
       hero, overview, details, features, faqs, specifications,
       materials, models_3d, downloads, gallery, colors,
       meta_title, meta_description, meta_keywords, created_at, updated_at)
     VALUES
      (:id, :slug, :title, :short_description, :category_id, :sub_category_id,
       true, 0, :content, NULL,
       :hero::jsonb, :overview::jsonb, :details::jsonb, :features::jsonb, :faqs::jsonb, :specifications::jsonb,
       :materials::jsonb, :models_3d::jsonb, :downloads::jsonb, :gallery::jsonb, :colors::jsonb,
       :meta_title, :meta_description, :meta_keywords, NOW(), NOW())`,
    {
      replacements: {
        id: randomUUID(),
        slug: product.slug,
        title: product.title,
        short_description: product.short_description,
        category_id: CATEGORY_ID,
        sub_category_id: SUB_CATEGORY_ID,
        content: product.content,
        ...Object.fromEntries(
          Object.entries(json).map(([k, v]) => [k, JSON.stringify(v)]),
        ),
        meta_title: product.meta_title,
        meta_description: product.meta_description,
        meta_keywords: product.meta_keywords,
      },
    },
  );
  console.log(`  ✔ added: ${SLUG}`);
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(
    `DELETE FROM ${constants.models.PRODUCT_TABLE} WHERE slug = :slug`,
    { replacements: { slug: SLUG } },
  );
}
