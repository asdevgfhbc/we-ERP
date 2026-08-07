import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { activeSettingsRole, settingsPermissionMatrix } from '@/features/settings/data/settings-data'

export function SettingsPermissionGuard({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const allowed = settingsPermissionMatrix[activeSettingsRole]?.includes(pageKey.toLowerCase()) ?? false

  if (!allowed) {
    return (
      <Card>
        <CardHeader><CardTitle>Permission Restricted</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Current role {activeSettingsRole} does not have access to {pageKey}.</p>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
