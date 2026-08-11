import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { SalesDashboardPage } from './dashboard/sales-dashboard-page'
import { QuotationListPage } from './quotations/quotation-list-page'
import { QuotationDetailsPage } from './quotations/quotation-details-page'
import { SalesOrdersPage } from './orders/sales-orders-page'
import { SalesOrderDetailsPage } from './orders/sales-order-details-page'
import { CreateSalesOrderPage } from './orders/create-sales-order-page'
import { DeliverySchedulingPage } from './deliveries/delivery-scheduling-page'
import { DeliveryTrackingPage } from './deliveries/delivery-tracking-page'
import { InvoiceListPage } from './invoices/invoice-list-page'
import { CreateInvoicePage } from './invoices/create-invoice-page'
import { InvoicePreviewPage } from './invoices/invoice-preview-page'
import { CustomerPaymentsPage } from './payments/customer-payments-page'
import { SalesReturnsPage } from './returns/sales-returns-page'
import { ModuleReportPage } from '@/components/shared/module-report-page'
import { ModuleSettingsPage } from '@/components/shared/module-settings-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

export function SalesRouter({ page }: { page: PageDefinition }) {
  const [selectedId, setSelectedId] = useState('INV-0001')
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

      {key === 'sales dashboard' ? <SalesDashboardPage /> : null}
      {key === 'quotations' ? <QuotationListPage onView={setSelectedId} /> : null}
      {key === 'quotation details' ? <QuotationDetailsPage id={selectedId} /> : null}
      {key === 'sales orders' ? <SalesOrdersPage onView={setSelectedId} /> : null}
      {key === 'sales order details' ? <SalesOrderDetailsPage id={selectedId} /> : null}
      {key === 'create sales order' ? <CreateSalesOrderPage /> : null}
      {key === 'delivery scheduling' ? <DeliverySchedulingPage onView={setSelectedId} /> : null}
      {key === 'delivery tracking' ? <DeliveryTrackingPage id={selectedId} /> : null}
      {key === 'invoice list' ? <InvoiceListPage onView={setSelectedId} /> : null}
      {key === 'create invoice' ? <CreateInvoicePage /> : null}
      {key === 'invoice preview' ? <InvoicePreviewPage id={selectedId} /> : null}
      {key === 'invoice details' ? <InvoicePreviewPage id={selectedId} /> : null}
      {key === 'customer payments' ? <CustomerPaymentsPage /> : null}
      {key === 'sales returns' ? <SalesReturnsPage /> : null}
      {key === 'vat invoice' ? <InvoicePreviewPage id={selectedId} /> : null}
      {key === 'generate sales report' ? <ModuleReportPage moduleName="Sales" /> : null}
      {key === 'sales settings' ? <ModuleSettingsPage moduleName="Sales" /> : null}

      {[
        'sales dashboard',
        'quotations',
        'quotation details',
        'sales orders',
        'sales order details',
        'create sales order',
        'delivery scheduling',
        'delivery tracking',
        'invoice list',
        'create invoice',
        'invoice preview',
        'invoice details',
        'customer payments',
        'sales returns',
        'vat invoice',
        'generate sales report',
        'sales settings',
      ].includes(key)
        ? null
        : <SalesDashboardPage />}
    </div>
  )
}
