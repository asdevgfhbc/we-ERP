import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function EmailSettingsPage() {
  return <SettingsFormPage config={settingsForms['email settings']} />
}
