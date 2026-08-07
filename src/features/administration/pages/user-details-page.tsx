import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { userDetail } from '@/features/administration/data/administration-data'

export function UserDetailsPage({ id }: { id: string }) {
  const detail = userDetail(id)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>User Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{detail.name}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Role</p><p className="font-medium">{detail.role}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{detail.email}</p></div>
          <div className="rounded-xl border border-border p-3 sm:col-span-2"><p className="text-xs text-muted-foreground">Permissions</p><p className="font-medium">{detail.permissions.join(', ')}</p></div>
        </CardContent>
      </Card>
      <PurchaseTimeline steps={detail.sessionHistory} />
    </div>
  )
}
