"use strict";

import constants from "../app/lib/constants/index.js";

// Order the website used to hardcode (client/web/src/lib/category-order.js).
// Used once to backfill so the site looks the same after this migration.
const LEGACY_PRIORITY_ORDER = [
  "workstations",
  "seating",
  "desk & table",
  "office storage",
  "office partitions",
  "soft seating",
  "office furniture accessories",
];
const LEGACY_LAST = "custom made";

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    const categoryTable = constants.models.CATEGORY_TABLE;
    const subCategoryTable = constants.models.SUB_CATEGORY_TABLE;

    for (const tableName of [categoryTable, subCategoryTable]) {
      await queryInterface.sequelize.query(
        `ALTER TABLE "${tableName}"
         ADD COLUMN IF NOT EXISTS "sort_order"
         INTEGER NOT NULL DEFAULT 0;`,
        { transaction: t },
      );

      await queryInterface.sequelize.query(
        `CREATE INDEX IF NOT EXISTS "${tableName}_sort_order_idx"
         ON "${tableName}" ("sort_order");`,
        { transaction: t },
      );
    }

    // Categories: legacy priority list first, then the rest by creation date,
    // "Custom Made" always last.
    await queryInterface.sequelize.query(
      `WITH ranked AS (
         SELECT id,
           ROW_NUMBER() OVER (
             ORDER BY
               CASE WHEN LOWER(TRIM(title)) = :last THEN 2
                    WHEN array_position(ARRAY[:priority]::text[], LOWER(TRIM(title))) IS NOT NULL THEN 0
                    ELSE 1 END,
               array_position(ARRAY[:priority]::text[], LOWER(TRIM(title))),
               created_at ASC
           ) AS rn
         FROM "${categoryTable}"
       )
       UPDATE "${categoryTable}" c
       SET sort_order = ranked.rn
       FROM ranked
       WHERE ranked.id = c.id;`,
      {
        transaction: t,
        replacements: { priority: LEGACY_PRIORITY_ORDER, last: LEGACY_LAST },
      },
    );

    // Sub categories: sequence within each category, by creation date.
    await queryInterface.sequelize.query(
      `WITH ranked AS (
         SELECT id,
           ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY created_at ASC) AS rn
         FROM "${subCategoryTable}"
       )
       UPDATE "${subCategoryTable}" sc
       SET sort_order = ranked.rn
       FROM ranked
       WHERE ranked.id = sc.id;`,
      { transaction: t },
    );
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    for (const tableName of [
      constants.models.CATEGORY_TABLE,
      constants.models.SUB_CATEGORY_TABLE,
    ]) {
      await queryInterface.sequelize.query(
        `DROP INDEX IF EXISTS "${tableName}_sort_order_idx";`,
        { transaction: t },
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE "${tableName}" DROP COLUMN IF EXISTS "sort_order";`,
        { transaction: t },
      );
    }
  });
}
