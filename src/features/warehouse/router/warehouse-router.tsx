import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { WarehouseDashboardPage } from '@/features/warehouse/pages/warehouse-dashboard-page'
import { StockManagementPage } from '@/features/warehouse/pages/stock-management-page'
import { StockLedgerPage } from '@/features/warehouse/pages/stock-ledger-page'
import { GoodsReceivingPage } from '@/features/warehouse/pages/goods-receiving-page'
import { InventoryMovementPage } from '@/features/warehouse/pages/inventory-movement-page'
import { BatchTrackingPage } from '@/features/warehouse/pages/batch-tracking-page'
import { SerialNumberTrackingPage } from '@/features/warehouse/pages/serial-number-tracking-page'
import { StockTransfersPage } from '@/features/warehouse/pages/stock-transfers-page'
import { StockAdjustmentsPage } from '@/features/warehouse/pages/stock-adjustments-page'
import { InventoryAuditPage } from '@/features/warehouse/pages/inventory-audit-page'
import { CycleCountPage } from '@/features/warehouse/pages/cycle-count-page'
import { LowStockAlertsPage } from '@/features/warehouse/pages/low-stock-alerts-page'
import { BinLocationsPage } from '@/features/warehouse/pages/bin-locations-page'
import { RackManagementPage } from '@/features/warehouse/pages/rack-management-page'
import { WarehouseDetailsPage } from '@/features/warehouse/pages/warehouse-details-page'
import { CargoShipPage } from '@/features/warehouse/pages/cargo-ship-page'
import { ModuleReportPage } from '@/components/shared/module-report-page'
import { ModuleSettingsPage } from '@/components/shared/module-settings-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'warehouse dashboard',
  'stock management',
  'stock ledger',
  'goods receiving (grn)',
  'inventory movement',
  'batch tracking',
  'serial number tracking',
  'stock transfers',
  'stock adjustments',
  'inventory audit',
  'cycle count',
  'low stock alerts',
  'bin locations',
  'rack management',
  'warehouse details',
  'generate warehouse report',
  'warehouse settings',
  'cargo ship',
]

export function WarehouseRouter({ page }: { page: PageDefinition }) {
  const [selectedId] = useState('WHS-0001')
  const key = useMemo(() => normalizeTitle(page.title), [page.title])

  return (
    <div className="space-y-5">

      {key === 'warehouse dashboard' ? <WarehouseDashboardPage /> : null}
      {key === 'stock management' ? <StockManagementPage /> : null}
      {key === 'stock ledger' ? <StockLedgerPage /> : null}
      {key === 'goods receiving (grn)' ? <GoodsReceivingPage /> : null}
      {key === 'inventory movement' ? <InventoryMovementPage /> : null}
      {key === 'batch tracking' ? <BatchTrackingPage /> : null}
      {key === 'serial number tracking' ? <SerialNumberTrackingPage /> : null}
      {key === 'stock transfers' ? <StockTransfersPage /> : null}
      {key === 'stock adjustments' ? <StockAdjustmentsPage /> : null}
      {key === 'inventory audit' ? <InventoryAuditPage /> : null}
      {key === 'cycle count' ? <CycleCountPage /> : null}
      {key === 'low stock alerts' ? <LowStockAlertsPage /> : null}
      {key === 'bin locations' ? <BinLocationsPage /> : null}
      {key === 'rack management' ? <RackManagementPage /> : null}
      {key === 'warehouse details' ? <WarehouseDetailsPage id={selectedId} /> : null}
      {key === 'generate warehouse report' ? <ModuleReportPage moduleName="Warehouse" /> : null}
      {key === 'warehouse settings' ? <ModuleSettingsPage moduleName="Warehouse" /> : null}

      {key === 'cargo ship' ? <CargoShipPage /> : null}

      {MATCHED_KEYS.includes(key) ? null : <WarehouseDashboardPage />}
    </div>
  )
}


