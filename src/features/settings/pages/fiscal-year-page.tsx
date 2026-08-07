import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function FiscalYearPage() {
  return <SettingsFormPage config={settingsForms['fiscal year']} />
}
