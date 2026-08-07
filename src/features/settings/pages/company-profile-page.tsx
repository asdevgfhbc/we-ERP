import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function CompanyProfilePage() {
  return <SettingsFormPage config={settingsForms['company profile']} />
}
