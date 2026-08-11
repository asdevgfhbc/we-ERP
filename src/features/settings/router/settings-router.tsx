import { useMemo } from 'react'
import type { PageDefinition } from '@/app/pages'
import { Badge, SecondaryButton } from '@/components/ui/primitives'
import { activeSettingsRole, normalizeSettingsTitle } from '@/features/settings/data/settings-data'
import { SettingsPermissionGuard } from '@/features/settings/router/settings-permission-guard'
import { CompanyProfilePage } from '@/features/settings/pages/company-profile-page'
import { CompanyLogoPage } from '@/features/settings/pages/company-logo-page'
import { BranchesPage } from '@/features/settings/pages/branches-page'
import { WarehousesPage } from '@/features/settings/pages/warehouses-page'
import { InvoiceSettingsPage } from '@/features/settings/pages/invoice-settings-page'
import { VatTaxPage } from '@/features/settings/pages/vat-tax-page'
import { CurrencyPage } from '@/features/settings/pages/currency-page'
import { FiscalYearPage } from '@/features/settings/pages/fiscal-year-page'
import { EmailSettingsPage } from '@/features/settings/pages/email-settings-page'
import { NotificationSettingsPage } from '@/features/settings/pages/notification-settings-page'
import { BackupRestorePage } from '@/features/settings/pages/backup-restore-page'
import { ModuleReportPage } from '@/components/shared/module-report-page'

const SETTINGS_KEYS = [
  'company profile',
  'company logo',
  'branches',
  'warehouses',
  'invoice settings',
  'vat / tax',
  'currency',
  'fiscal year',
  'email settings',
  'notification settings',
  'backup & restore',
  'generate settings report',
]

export function SettingsRouter({ page }: { page: PageDefinition }) {
  const key = useMemo(() => normalizeSettingsTitle(page.title), [page.title])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge>Settings Governance Active</Badge>
            <Badge>Role: {activeSettingsRole}</Badge>
            <Badge>Permission Guard Enabled</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Save Template
          </button>
        </div>
      </div>

      <SettingsPermissionGuard pageKey={key}>
        {key === 'company profile' ? <CompanyProfilePage /> : null}
        {key === 'company logo' ? <CompanyLogoPage /> : null}
        {key === 'branches' ? <BranchesPage /> : null}
        {key === 'warehouses' ? <WarehousesPage /> : null}
        {key === 'invoice settings' ? <InvoiceSettingsPage /> : null}
        {key === 'vat / tax' ? <VatTaxPage /> : null}
        {key === 'currency' ? <CurrencyPage /> : null}
        {key === 'fiscal year' ? <FiscalYearPage /> : null}
        {key === 'email settings' ? <EmailSettingsPage /> : null}
        {key === 'notification settings' ? <NotificationSettingsPage /> : null}
        {key === 'backup & restore' ? <BackupRestorePage /> : null}
        {key === 'generate settings report' ? <ModuleReportPage moduleName="Settings" /> : null}
        {SETTINGS_KEYS.includes(key) ? null : <CompanyProfilePage />}
      </SettingsPermissionGuard>
    </div>
  )
}
