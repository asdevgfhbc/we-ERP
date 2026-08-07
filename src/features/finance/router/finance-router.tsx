import { useMemo } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { FinanceDashboardPage } from '@/features/finance/pages/finance-dashboard-page'
import { AccountsReceivablePage } from '@/features/finance/pages/accounts-receivable-page'
import { AccountsPayablePage } from '@/features/finance/pages/accounts-payable-page'
import { ExpensesPage } from '@/features/finance/pages/expenses-page'
import { BankAccountsPage } from '@/features/finance/pages/bank-accounts-page'
import { BankTransactionsPage } from '@/features/finance/pages/bank-transactions-page'
import { JournalEntriesPage } from '@/features/finance/pages/journal-entries-page'
import { CashBookPage } from '@/features/finance/pages/cash-book-page'
import { GeneralLedgerPage } from '@/features/finance/pages/general-ledger-page'
import { TrialBalancePage } from '@/features/finance/pages/trial-balance-page'
import { BalanceSheetPage } from '@/features/finance/pages/balance-sheet-page'
import { ProfitLossPage } from '@/features/finance/pages/profit-loss-page'
import { TaxSummaryPage } from '@/features/finance/pages/tax-summary-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'finance dashboard',
  'accounts receivable',
  'accounts payable',
  'expenses',
  'bank accounts',
  'bank transactions',
  'journal entries',
  'cash book',
  'general ledger',
  'trial balance',
  'balance sheet',
  'profit & loss',
  'tax summary',
]

export function FinanceRouter({ page }: { page: PageDefinition }) {
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

      {key === 'finance dashboard' ? <FinanceDashboardPage /> : null}
      {key === 'accounts receivable' ? <AccountsReceivablePage /> : null}
      {key === 'accounts payable' ? <AccountsPayablePage /> : null}
      {key === 'expenses' ? <ExpensesPage /> : null}
      {key === 'bank accounts' ? <BankAccountsPage /> : null}
      {key === 'bank transactions' ? <BankTransactionsPage /> : null}
      {key === 'journal entries' ? <JournalEntriesPage /> : null}
      {key === 'cash book' ? <CashBookPage /> : null}
      {key === 'general ledger' ? <GeneralLedgerPage /> : null}
      {key === 'trial balance' ? <TrialBalancePage /> : null}
      {key === 'balance sheet' ? <BalanceSheetPage /> : null}
      {key === 'profit & loss' ? <ProfitLossPage /> : null}
      {key === 'tax summary' ? <TaxSummaryPage /> : null}

      {MATCHED_KEYS.includes(key) ? null : <FinanceDashboardPage />}
    </div>
  )
}
