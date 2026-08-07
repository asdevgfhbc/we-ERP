import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton } from '@/components/ui/primitives'

export function UserProfilePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">User Profile</h1>
        <p className="text-sm text-muted-foreground">Manage personal information, contact preferences, and role details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Full Name" defaultValue="ERP Administrator" />
          <Input placeholder="Email" defaultValue="admin@we-erp.local" />
          <Input placeholder="Phone" defaultValue="+1 555 010 7788" />
          <Input placeholder="Department" defaultValue="Corporate Operations" />
          <Input placeholder="Role" defaultValue="System Administrator" />
          <Input placeholder="Location" defaultValue="Head Office" />
          <div className="md:col-span-2 flex justify-end gap-2">
            <SecondaryButton>Cancel</SecondaryButton>
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
              Save Profile
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
