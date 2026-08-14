CREATE TABLE IF NOT EXISTS cargo_ship (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    shipping_mark TEXT,
    pictures TEXT,
    hs_code VARCHAR(50),
    item_number VARCHAR(100),

    product_name_en TEXT,
    product_name_zh TEXT,

    specification TEXT,
    material TEXT,

    total_qty DECIMAL(18,3),
    unit_price_rmb DECIMAL(18,2),
    total_price_rmb DECIMAL(18,2),

    unit VARCHAR(30),

    qty_per_ctn DECIMAL(18,3),
    ctns DECIMAL(18,3),
    ctn_no VARCHAR(100),

    cbm_per_ctn DECIMAL(18,6),
    cbm_per_item DECIMAL(18,6),
    total_cbm DECIMAL(18,6),

    net_weight DECIMAL(18,3),
    ctn_kg_gw DECIMAL(18,3),
    total_kg DECIMAL(18,3),

    g_t TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
