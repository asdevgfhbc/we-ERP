import { SettingsTablePage } from '@/features/settings/components/settings-table-page'
import { settingsTableData } from '@/features/settings/data/settings-data'

export function BranchesPage() {
  return (
    <SettingsTablePage
      title="Branches"
      rows={settingsTableData.branches}
      columns={[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Branch' },
        { key: 'city', label: 'City' },
        { key: 'manager', label: 'Manager' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
