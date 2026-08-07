import type { PageDefinition } from '@/app/pages'
import { SettingsRouter } from '@/features/settings/router/settings-router'

export default function SettingsPage({ page }: { page: PageDefinition }) {
  return <SettingsRouter page={page} />
}
