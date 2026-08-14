import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

const CARGO_SHIP_COLUMNS = [
  "shipping_mark",
  "pictures",
  "hs_code",
  "item_number",
  "product_name_en",
  "product_name_zh",
  "specification",
  "material",
  "total_qty",
  "unit_price_rmb",
  "total_price_rmb",
  "unit",
  "qty_per_ctn",
  "ctns",
  "ctn_no",
  "cbm_per_ctn",
  "cbm_per_item",
  "total_cbm",
  "net_weight",
  "ctn_kg_gw",
  "total_kg",
  "g_t",
] as const;

type CargoShipColumn = (typeof CARGO_SHIP_COLUMNS)[number];

type CargoShipRow = Record<CargoShipColumn, unknown>;

type CargoShipValidationError = {
  row: number;
  field: CargoShipColumn | "rows";
  reason: string;
};

const INSERT_SQL = `
  INSERT INTO cargo_ship (
    shipping_mark,
    pictures,
    hs_code,
    item_number,
    product_name_en,
    product_name_zh,
    specification,
    material,
    total_qty,
    unit_price_rmb,
    total_price_rmb,
    unit,
    qty_per_ctn,
    ctns,
    ctn_no,
    cbm_per_ctn,
    cbm_per_item,
    total_cbm,
    net_weight,
    ctn_kg_gw,
    total_kg,
    g_t
  )
  VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`;

const NUMERIC_COLUMNS = new Set<CargoShipColumn>([
  "total_qty",
  "unit_price_rmb",
  "total_price_rmb",
  "qty_per_ctn",
  "ctns",
  "cbm_per_ctn",
  "cbm_per_item",
  "total_cbm",
  "net_weight",
  "ctn_kg_gw",
  "total_kg",
]);

function normalizeValue(column: CargoShipColumn, value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (NUMERIC_COLUMNS.has(column)) {
    const numericValue = typeof value === "number"
      ? value
      : Number(String(value).replace(/,/g, "").trim());

    if (!Number.isFinite(numericValue)) {
      throw new Error(`Invalid numeric value for ${column}: ${String(value)}`);
    }

    return numericValue;
  }

  return String(value).trim();
}

function buildRowKey(row: CargoShipRow) {
  return [
    String(row.shipping_mark ?? "").trim(),
    String(row.item_number ?? "").trim(),
    String(row.ctn_no ?? "").trim(),
  ].join("::");
}

function validateImportRows(rows: CargoShipRow[]) {
  const errors: CargoShipValidationError[] = [];
  const normalizedRows: unknown[][] = [];
  const seenRowKeys = new Map<string, number>();

  for (const [rowIndex, row] of rows.entries()) {
    const rowNumber = rowIndex + 1;
    const itemNumber = String(row.item_number ?? "").trim();
    const productName = String(row.product_name_en ?? "").trim();
    const rowKey = buildRowKey(row);

    if (!itemNumber) {
      errors.push({
        row: rowNumber,
        field: "item_number",
        reason: "Item Number is required.",
      });
    }

    if (!productName) {
      errors.push({
        row: rowNumber,
        field: "product_name_en",
        reason: "Product name(English) is required.",
      });
    }

    if (rowKey !== "::::" && seenRowKeys.has(rowKey)) {
      errors.push({
        row: rowNumber,
        field: "rows",
        reason: `Duplicate upload row matches row ${seenRowKeys.get(rowKey)}.`,
      });
    } else {
      seenRowKeys.set(rowKey, rowNumber);
    }

    const normalizedValues: unknown[] = [];

    for (const column of CARGO_SHIP_COLUMNS) {
      try {
        normalizedValues.push(normalizeValue(column, row[column]));
      } catch (error) {
        errors.push({
          row: rowNumber,
          field: column,
          reason: error instanceof Error ? error.message : String(error),
        });
      }
    }

    if (normalizedValues.length === CARGO_SHIP_COLUMNS.length) {
      normalizedRows.push(normalizedValues);
    }
  }

  return {
    errors,
    normalizedRows,
  };
}

router.get("/", (_req, res) => {
  const rows = db.prepare(`
    SELECT
      id,
      shipping_mark,
      pictures,
      hs_code,
      item_number,
      product_name_en,
      product_name_zh,
      specification,
      material,
      total_qty,
      unit_price_rmb,
      total_price_rmb,
      unit,
      qty_per_ctn,
      ctns,
      ctn_no,
      cbm_per_ctn,
      cbm_per_item,
      total_cbm,
      net_weight,
      ctn_kg_gw,
      total_kg,
      g_t,
      created_at,
      updated_at
    FROM cargo_ship
    ORDER BY id DESC
  `).all();

  res.json({
    success: true,
    data: rows,
  });
});
router.post("/import", (req, res) => {
  console.log("CARGO SHIP REQUEST BODY:", JSON.stringify(req.body));
  const rows = req.body?.rows;

  if (!Array.isArray(rows)) {
    return res.status(400).json({
      success: false,
      message: "rows must be an array",
    });
  }

  if (rows.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No rows to import",
    });
  }

  try {
    const { errors, normalizedRows } = validateImportRows(rows as CargoShipRow[]);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cargo Ship import validation failed",
        errors,
      });
    }

    const insert = db.prepare(INSERT_SQL);

    db.exec("BEGIN");

    for (const values of normalizedRows) {
      insert.run(...values);
    }

    db.exec("COMMIT");

    return res.status(201).json({
      success: true,
      imported: rows.length,
    });
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      // Ignore rollback errors.
    }

    console.error("Cargo Ship import failed:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
      detail: error instanceof Error ? error.stack : String(error),
    });
  }
});

export default router;




