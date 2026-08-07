import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { currentRole, permissionMatrix } from '@/features/administration/data/administration-data'

export function PermissionGuard({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const allowed = permissionMatrix[currentRole]?.includes(pageKey.toLowerCase()) ?? false

  if (!allowed) {
    return (
      <Card>
        <CardHeader><CardTitle>Permission Restricted</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Current role {currentRole} does not have access to {pageKey}.</p>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
