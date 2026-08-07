import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives'
import { PurchaseTimeline } from '@/features/purchasing/components/purchase-timeline'
import { employeeDetail } from '@/features/hr/data/hr-data'

export function EmployeeDetailsPage({ id }: { id: string }) {
  const detail = employeeDetail(id)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Employee Details</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{detail.name}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Department</p><p className="font-medium">{detail.department}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Designation</p><p className="font-medium">{detail.designation}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{detail.email}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{detail.phone}</p></div>
          <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{detail.status}</p></div>
        </CardContent>
      </Card>
      <PurchaseTimeline steps={detail.timeline} />
    </div>
  )
}
