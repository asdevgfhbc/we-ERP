import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { PurchasingDashboardPage } from '@/features/purchasing/pages/purchasing-dashboard-page'
import { PurchaseOrdersPage } from '@/features/purchasing/pages/purchase-orders-page'
import { CreatePurchaseOrderPage } from '@/features/purchasing/pages/create-purchase-order-page'
import { PurchaseOrderDetailsPage } from '@/features/purchasing/pages/purchase-order-details-page'
import { GoodsReceivingGrnPage } from '@/features/purchasing/pages/goods-receiving-grn-page'
import { SupplierPaymentsPage } from '@/features/purchasing/pages/supplier-payments-page'
import { PurchaseReturnsPage } from '@/features/purchasing/pages/purchase-returns-page'
import { ImportDocumentsPage } from '@/features/purchasing/pages/import-documents-page'
import { ShipmentTrackingPage } from '@/features/purchasing/pages/shipment-tracking-page'
import { ContainerTrackingPage } from '@/features/purchasing/pages/container-tracking-page'
import { CustomsDutyPage } from '@/features/purchasing/pages/customs-duty-page'
import { SupplierPerformancePage } from '@/features/purchasing/pages/supplier-performance-page'
import { ModuleReportPage } from '@/components/shared/module-report-page'
import { ModuleSettingsPage } from '@/components/shared/module-settings-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'purchasing dashboard',
  'purchase orders',
  'create purchase order',
  'purchase order details',
  'goods receiving (grn)',
  'supplier payments',
  'purchase returns',
  'import documents',
  'shipment tracking',
  'container tracking',
  'customs & duty',
  'supplier performance',
  'generate purchasing report',
  'purchasing settings',
]

export function PurchasingRouter({ page }: { page: PageDefinition }) {
  const [selectedId, setSelectedId] = useState('PO-0001')
  const key = useMemo(() => normalizeTitle(page.title), [page.title])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Add New
          </button>
        </div>
      </div>

      {key === 'purchasing dashboard' ? <PurchasingDashboardPage /> : null}
      {key === 'purchase orders' ? <PurchaseOrdersPage onView={setSelectedId} /> : null}
      {key === 'create purchase order' ? <CreatePurchaseOrderPage /> : null}
      {key === 'purchase order details' ? <PurchaseOrderDetailsPage id={selectedId} /> : null}
      {key === 'goods receiving (grn)' ? <GoodsReceivingGrnPage /> : null}
      {key === 'supplier payments' ? <SupplierPaymentsPage /> : null}
      {key === 'purchase returns' ? <PurchaseReturnsPage /> : null}
      {key === 'import documents' ? <ImportDocumentsPage /> : null}
      {key === 'shipment tracking' ? <ShipmentTrackingPage id={selectedId} /> : null}
      {key === 'container tracking' ? <ContainerTrackingPage /> : null}
      {key === 'customs & duty' ? <CustomsDutyPage /> : null}
      {key === 'supplier performance' ? <SupplierPerformancePage /> : null}
      {key === 'generate purchasing report' ? <ModuleReportPage moduleName="Purchasing" /> : null}
      {key === 'purchasing settings' ? <ModuleSettingsPage moduleName="Purchasing" /> : null}

      {MATCHED_KEYS.includes(key) ? null : <PurchasingDashboardPage />}
    </div>
  )
}
