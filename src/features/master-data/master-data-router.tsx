import type { PageDefinition } from '@/app/pages'
import { ProductPage } from './products/product-page'
import { CategoryPage } from './categories/category-page'
import { BrandPage } from './brands/brand-page'
import { UnitPage } from './units/unit-page'
import { CustomerPage } from './customers/customer-page'
import { SupplierPage } from './suppliers/supplier-page'
import { WarehousePage } from './warehouses/warehouse-page'

export function MasterDataRouter({ page }: { page: PageDefinition }) {
  if (page.entity === 'product') return <ProductPage page={page} />
  if (page.entity === 'category') return <CategoryPage page={page} />
  if (page.entity === 'brand') return <BrandPage page={page} />
  if (page.entity === 'unit') return <UnitPage page={page} />
  if (page.entity === 'customer') return <CustomerPage page={page} />
  if (page.entity === 'supplier') return <SupplierPage page={page} />
  if (page.entity === 'warehouse') return <WarehousePage page={page} />

  return <ProductPage page={page} />
}
