import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { formatCurrency } from '@/lib/utils'
import { Badge, Card, CardContent, CardHeader, CardTitle, SecondaryButton } from '@/components/ui/primitives'
import { MasterDataTable } from './master-data-table'
import { MasterDetailGrid } from './master-detail-grid'
import { MasterForm } from './master-form'
import { MasterTimeline } from './master-timeline'
import {
  configs,
  getCustomerDetail,
  getProductDetail,
  getRows,
  getSupplierDetail,
  getTimeline,
  getWarehouseDetail,
} from './data'
import type { MasterEntity } from './types'
import { prettyLabel } from './master-utils'

type MasterViewMode = 'list' | 'create' | 'edit' | 'detail' | 'history'

function renderKpiCards(entity: MasterEntity) {
  const rows = getRows(entity)
  const total = rows.length
  const active = rows.filter((row) => String(row.status).toLowerCase() === 'active').length

  return [
    { label: 'Total Records', value: total },
    { label: 'Active Records', value: active },
    { label: 'Pending Review', value: rows.filter((row) => String(row.status).toLowerCase() === 'pending').length },
  ]
}

function ActivityTimeline({ entity }: { entity: MasterEntity }) {
  return <MasterTimeline title="Activity Timeline" events={getTimeline(entity)} />
}

function CustomerDetails({ id }: { id: string }) {
  const detail = getCustomerDetail(id)

  return (
    <div className="space-y-4">
      <MasterDetailGrid
        title="Customer Information"
        details={[
          { label: 'Customer', value: String(detail.customer.name) },
          { label: 'Code', value: String(detail.customer.code) },
          { label: 'City', value: String(detail.customer.city) },
          { label: 'Phone', value: String(detail.customer.phone) },
          { label: 'Credit Limit', value: formatCurrency(Number(detail.customer.creditLimit ?? 0)) },
          { label: 'Outstanding Balance', value: formatCurrency(Number(detail.customer.outstanding ?? 0)) },
        ]}
      />
      <MasterDetailGrid
        title="Sales History"
        details={detail.salesHistory.map((row) => ({
          label: `${row.number} (${row.date})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Payment History"
        details={detail.paymentHistory.map((row) => ({
          label: `${row.reference} (${row.method})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Delivery History"
        details={detail.deliveryHistory.map((row) => ({
          label: `${row.deliveryNo} (${row.route})`,
          value: `${row.date} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Recent Activity"
        details={[
          { label: 'Last Interaction', value: 'Credit review completed by Finance Manager' },
          { label: 'Current Follow-up', value: 'Payment follow-up scheduled for 2026-08-12' },
          { label: 'Risk Indicator', value: 'Medium - monitor outstanding trend' },
        ]}
      />
    </div>
  )
}

function SupplierDetails({ id }: { id: string }) {
  const detail = getSupplierDetail(id)

  return (
    <div className="space-y-4">
      <MasterDetailGrid
        title="Supplier Information"
        details={[
          { label: 'Supplier', value: String(detail.supplier.name) },
          { label: 'Code', value: String(detail.supplier.code) },
          { label: 'Country', value: String(detail.supplier.country) },
          { label: 'Contact', value: String(detail.supplier.contact) },
          { label: 'Terms', value: String(detail.supplier.terms) },
          { label: 'Outstanding Balance', value: formatCurrency(Number(detail.supplier.outstanding ?? 0)) },
        ]}
      />
      <MasterDetailGrid
        title="Purchase History"
        details={detail.purchaseHistory.map((row) => ({
          label: `${row.number} (${row.date})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Payment History"
        details={detail.paymentHistory.map((row) => ({
          label: `${row.reference} (${row.method})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Import Documents"
        details={detail.importDocuments.map((row) => ({
          label: `${row.reference} (${row.type})`,
          value: `${row.date} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Contact Persons"
        details={[
          { label: 'Procurement Lead', value: 'Lina Wu | +86 139 0112 8876' },
          { label: 'Finance Contact', value: 'Johan Berg | +46 70 122 8337' },
          { label: 'Logistics Coordinator', value: 'Aylin Demir | +90 542 881 2204' },
        ]}
      />
      <MasterDetailGrid
        title="Recent Activity"
        details={[
          { label: 'Last PO', value: 'PO-2026-0198 approved and released' },
          { label: 'Payment Action', value: 'Partial payment posted on 2026-08-05' },
          { label: 'Import Status', value: 'Two import documents pending customs validation' },
        ]}
      />
    </div>
  )
}

function ProductDetails({ id }: { id: string }) {
  const detail = getProductDetail(id)

  return (
    <div className="space-y-4">
      <MasterDetailGrid
        title="Product Information"
        details={[
          { label: 'Product', value: String(detail.product.name) },
          { label: 'Code', value: String(detail.product.code) },
          { label: 'Category', value: String(detail.product.category) },
          { label: 'Brand', value: String(detail.product.brand) },
          { label: 'Unit', value: String(detail.product.unit) },
          { label: 'Current Stock', value: String(detail.product.stock) },
        ]}
      />
      <MasterDetailGrid title="Images" details={[{ label: 'Primary Image', value: 'product-image-main.jpg' }, { label: 'Alt Image', value: 'product-image-alt.jpg' }]} />
      <MasterDetailGrid
        title="Purchase History"
        details={detail.purchaseHistory.map((row) => ({
          label: `${row.number} (${row.date})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Sales History"
        details={detail.salesHistory.map((row) => ({
          label: `${row.number} (${row.date})`,
          value: `${formatCurrency(row.amount)} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Stock Movement"
        details={detail.stockMovement.map((row) => ({
          label: `${row.reference} - ${row.movement}`,
          value: `Qty ${row.qty} | Balance ${row.balance}`,
        }))}
      />
      <MasterDetailGrid
        title="Batch History"
        details={detail.batchHistory.map((row) => ({
          label: `${row.batchNo} (${row.expiry})`,
          value: `Qty ${row.qty} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid title="Inventory Summary" details={[{ label: 'Inventory Value', value: formatCurrency(184200) }, { label: 'Reorder Status', value: '2 SKUs below threshold' }, { label: 'Turnover Class', value: 'A-Class' }]} />
    </div>
  )
}

function WarehouseDetails({ id }: { id: string }) {
  const detail = getWarehouseDetail(id)

  return (
    <div className="space-y-4">
      <MasterDetailGrid
        title="Warehouse Information"
        details={[
          { label: 'Warehouse', value: String(detail.warehouse.name) },
          { label: 'Code', value: String(detail.warehouse.code) },
          { label: 'Branch', value: String(detail.warehouse.branch) },
          { label: 'Capacity', value: Number(detail.warehouse.capacity) },
          { label: 'Utilization', value: `${detail.warehouse.utilization}%` },
          { label: 'Inventory Value', value: formatCurrency(Number(detail.warehouse.inventoryValue ?? 0)) },
        ]}
      />
      <MasterDetailGrid
        title="Transfer History"
        details={detail.transferHistory.map((row) => ({
          label: `${row.reference} (${row.date})`,
          value: `${row.from} -> ${row.to} | Qty ${row.qty} | ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Goods Receiving History"
        details={detail.grnHistory.map((row) => ({
          label: `${row.grnNo} (${row.date})`,
          value: `${row.supplier} - ${row.status}`,
        }))}
      />
      <MasterDetailGrid
        title="Stock Adjustments"
        details={detail.adjustmentHistory.map((row) => ({
          label: `${row.reference} (${row.reason})`,
          value: `Qty ${row.qty} | ${row.status} | ${row.date}`,
        }))}
      />
      <MasterDetailGrid
        title="Low Stock Products"
        details={detail.lowStock.map((row) => ({
          label: `${row.sku} - ${row.product}`,
          value: `On Hand ${row.onHand} | Reorder ${row.reorder}`,
        }))}
      />
      <MasterDetailGrid title="Stock Summary" details={[{ label: 'Total SKUs', value: 842 }, { label: 'Active Bins', value: 188 }, { label: 'Pending Transfers', value: 9 }]} />
      <MasterDetailGrid
        title="Recent Activity"
        details={[
          { label: 'Last GRN', value: 'GRN-0004 completed and posted to stock ledger' },
          { label: 'Transfer Alert', value: 'Transit Buffer Store transfer awaiting dispatch' },
          { label: 'Cycle Count', value: 'Cycle count variance reduced by 14% this week' },
        ]}
      />
    </div>
  )
}

function GenericDetails({ entity, id }: { entity: MasterEntity; id: string }) {
  const row = getRows(entity).find((item) => String(item.id) === id) ?? getRows(entity)[0]
  return (
    <MasterDetailGrid
      title={`${configs[entity].singularLabel} Details`}
      details={Object.entries(row).map(([key, value]) => ({
        label: prettyLabel(key),
        value,
      }))}
    />
  )
}

export function MasterEntityPage({ page, entity }: { page: PageDefinition; entity: MasterEntity }) {
  const [mode, setMode] = useState<MasterViewMode>(() => {
    if (page.title.startsWith('Create')) return 'create'
    if (page.title.startsWith('Edit')) return 'edit'
    if (page.title.includes('Details')) return 'detail'
    if (page.title.includes('History')) return 'history'
    return 'list'
  })
  const [rows, setRows] = useState(getRows(entity))
  const [selectedId, setSelectedId] = useState(String(rows[0]?.id ?? ''))

  const config = configs[entity]
  const kpis = useMemo(() => renderKpiCards(entity), [entity])

  const selectedRecord = rows.find((row) => String(row.id) === selectedId)

  const handleDelete = (ids: string[]) => {
    setRows((current) => current.filter((row) => !ids.includes(String(row.id))))
    if (ids.includes(selectedId)) {
      setSelectedId(String(rows[0]?.id ?? ''))
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => setMode('list')}>List</SecondaryButton>
          <SecondaryButton onClick={() => setMode('create')}>Create</SecondaryButton>
          <SecondaryButton onClick={() => setMode('edit')}>Edit</SecondaryButton>
          <SecondaryButton onClick={() => setMode('detail')}>Details</SecondaryButton>
          <SecondaryButton onClick={() => setMode('history')}>History</SecondaryButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-semibold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {mode === 'list' ? (
        <MasterDataTable
          config={config}
          rows={rows}
          onView={(id) => {
            setSelectedId(id)
            setMode('detail')
          }}
          onEdit={(id) => {
            setSelectedId(id)
            setMode('edit')
          }}
          onDelete={handleDelete}
        />
      ) : null}

      {mode === 'create' ? <MasterForm config={config} mode="create" /> : null}

      {mode === 'edit' ? (
        <MasterForm config={config} mode="edit" initialData={selectedRecord} />
      ) : null}

      {mode === 'detail' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Viewing</p>
              <p className="font-medium">{selectedRecord ? String(selectedRecord.name ?? selectedRecord.code ?? selectedRecord.id) : 'N/A'}</p>
            </div>
            <Badge>{config.singularLabel}</Badge>
          </div>

          {entity === 'customer' ? <CustomerDetails id={selectedId} /> : null}
          {entity === 'supplier' ? <SupplierDetails id={selectedId} /> : null}
          {entity === 'product' ? <ProductDetails id={selectedId} /> : null}
          {entity === 'warehouse' ? <WarehouseDetails id={selectedId} /> : null}
          {entity !== 'customer' && entity !== 'supplier' && entity !== 'product' && entity !== 'warehouse' ? (
            <GenericDetails entity={entity} id={selectedId} />
          ) : null}

          <ActivityTimeline entity={entity} />
        </div>
      ) : null}

      {mode === 'history' ? (
        <div className="space-y-4">
          <MasterTimeline title={`${config.singularLabel} History`} events={getTimeline(entity)} />
          <MasterTimeline title="Activity Timeline" events={getTimeline(entity)} />
        </div>
      ) : null}
    </div>
  )
}
