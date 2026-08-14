export type CargoShipColumnDefinition = {
  excel: string
  db: string
  aliases?: string[]
}

export const cargoShipColumns = [
  { excel: 'Shipping Mark', db: 'shipping_mark' },
  { excel: 'Pictures', db: 'pictures' },
  { excel: 'HS CODE', db: 'hs_code' },
  { excel: 'Item Number', db: 'item_number' },
  { excel: 'Product name(English)', db: 'product_name_en' },
  { excel: 'Product name(Chinese)', db: 'product_name_zh', aliases: ['Product name(Chinese )'] },
  { excel: 'Specification', db: 'specification' },
  { excel: 'Material', db: 'material' },
  { excel: 'TOTAL QTY', db: 'total_qty' },
  { excel: 'UNIT PRICE(RMB)', db: 'unit_price_rmb' },
  { excel: 'TOTAL PRICE(RMB)', db: 'total_price_rmb', aliases: ['TOTAL PRICR (RMB)'] },
  { excel: 'UNIT', db: 'unit' },
  { excel: 'QTY/CTN', db: 'qty_per_ctn' },
  { excel: 'CTNS', db: 'ctns' },
  { excel: 'CTN.NO', db: 'ctn_no' },
  { excel: 'CBM/CTN', db: 'cbm_per_ctn' },
  { excel: 'CBM/ITEM', db: 'cbm_per_item', aliases: ['CBM/CTN'] },
  { excel: 'TOTAL/CBM', db: 'total_cbm' },
  { excel: 'NET WEIGHT', db: 'net_weight' },
  { excel: 'CTN/KG GW', db: 'ctn_kg_gw' },
  { excel: 'TOTAL/KG', db: 'total_kg', aliases: ['TOTAL /KG'] },
  { excel: 'G/T', db: 'g_t' },
] as const satisfies readonly CargoShipColumnDefinition[]
