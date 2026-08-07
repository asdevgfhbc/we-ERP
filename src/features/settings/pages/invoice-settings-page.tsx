import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function InvoiceSettingsPage() {
  return <SettingsFormPage config={settingsForms['invoice settings']} />
}
