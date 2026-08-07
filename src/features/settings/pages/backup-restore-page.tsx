import { SettingsFormPage } from '@/features/settings/components/settings-form-page'
import { settingsForms } from '@/features/settings/data/settings-data'

export function BackupRestorePage() {
  return <SettingsFormPage config={settingsForms['backup & restore']} />
}
