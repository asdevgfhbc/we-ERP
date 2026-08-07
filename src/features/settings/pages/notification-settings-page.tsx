import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function NotificationSettingsPage() {
  return <SettingsFormPage config={settingsForms['notification settings']} />
}
