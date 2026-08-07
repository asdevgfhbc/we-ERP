import { useMemo } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { ReportsDashboardPage } from '@/features/reports/pages/reports-dashboard-page'
import { SalesReportsPage } from '@/features/reports/pages/sales-reports-page'
import { PurchaseReportsPage } from '@/features/reports/pages/purchase-reports-page'
import { InventoryReportsPage } from '@/features/reports/pages/inventory-reports-page'
import { FinancialReportsPage } from '@/features/reports/pages/financial-reports-page'
import { PerformanceDashboardPage } from '@/features/reports/pages/performance-dashboard-page'
import { StockAgingPage } from '@/features/reports/pages/stock-aging-page'
import { CustomerAgingPage } from '@/features/reports/pages/customer-aging-page'
import { SupplierAgingPage } from '@/features/reports/pages/supplier-aging-page'
import { RevenueAnalysisPage } from '@/features/reports/pages/revenue-analysis-page'
import { ExpenseAnalysisPage } from '@/features/reports/pages/expense-analysis-page'
import { CashFlowPage } from '@/features/reports/pages/cash-flow-page'
import { InventoryValuePage } from '@/features/reports/pages/inventory-value-page'
import { TopSellingProductsPage } from '@/features/reports/pages/top-selling-products-page'
import { TopCustomersPage } from '@/features/reports/pages/top-customers-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'reports dashboard',
  'sales reports',
  'purchase reports',
  'inventory reports',
  'financial reports',
  'performance dashboard',
  'stock aging',
  'customer aging',
  'supplier aging',
  'revenue analysis',
  'expense analysis',
  'cash flow',
  'inventory value',
  'top selling products',
  'top customers',
]

export function ReportsRouter({ page }: { page: PageDefinition }) {
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
            Generate
          </button>
        </div>
      </div>

      {key === 'reports dashboard' ? <ReportsDashboardPage /> : null}
      {key === 'sales reports' ? <SalesReportsPage /> : null}
      {key === 'purchase reports' ? <PurchaseReportsPage /> : null}
      {key === 'inventory reports' ? <InventoryReportsPage /> : null}
      {key === 'financial reports' ? <FinancialReportsPage /> : null}
      {key === 'performance dashboard' ? <PerformanceDashboardPage /> : null}
      {key === 'stock aging' ? <StockAgingPage /> : null}
      {key === 'customer aging' ? <CustomerAgingPage /> : null}
      {key === 'supplier aging' ? <SupplierAgingPage /> : null}
      {key === 'revenue analysis' ? <RevenueAnalysisPage /> : null}
      {key === 'expense analysis' ? <ExpenseAnalysisPage /> : null}
      {key === 'cash flow' ? <CashFlowPage /> : null}
      {key === 'inventory value' ? <InventoryValuePage /> : null}
      {key === 'top selling products' ? <TopSellingProductsPage /> : null}
      {key === 'top customers' ? <TopCustomersPage /> : null}

      {MATCHED_KEYS.includes(key) ? null : <ReportsDashboardPage />}
    </div>
  )
}
