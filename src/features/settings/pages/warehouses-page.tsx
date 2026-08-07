import { SettingsTablePage } from '@/features/settings/components/settings-table-page'
import { settingsTableData } from '@/features/settings/data/settings-data'

export function WarehousesPage() {
  return (
    <SettingsTablePage
      title="Warehouses"
      rows={settingsTableData.warehouses}
      columns={[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Warehouse' },
        { key: 'branch', label: 'Branch' },
        { key: 'capacity', label: 'Capacity', align: 'right' },
        { key: 'utilization', label: 'Utilization', align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
