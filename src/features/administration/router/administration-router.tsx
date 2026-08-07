import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { Badge, SecondaryButton } from '@/components/ui/primitives'
import { currentRole } from '@/features/administration/data/administration-data'
import { UsersPage } from '@/features/administration/pages/users-page'
import { UserDetailsPage } from '@/features/administration/pages/user-details-page'
import { RolesPage } from '@/features/administration/pages/roles-page'
import { PermissionsPage } from '@/features/administration/pages/permissions-page'
import { RoleAssignmentsPage } from '@/features/administration/pages/role-assignments-page'
import { ActivityLogsPage } from '@/features/administration/pages/activity-logs-page'
import { AuditTrailPage } from '@/features/administration/pages/audit-trail-page'
import { SystemLogsPage } from '@/features/administration/pages/system-logs-page'
import { LoginHistoryPage } from '@/features/administration/pages/login-history-page'
import { PermissionGuard } from '@/features/administration/router/permission-guard'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'users',
  'user details',
  'roles',
  'permissions',
  'role assignments',
  'activity logs',
  'audit trail',
  'system logs',
  'login history',
]

export function AdministrationRouter({ page }: { page: PageDefinition }) {
  const [selectedId, setSelectedId] = useState('USR-0001')
  const key = useMemo(() => normalizeTitle(page.title), [page.title])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge>Role-based Navigation Active</Badge>
            <Badge>Current Role: {currentRole}</Badge>
            <Badge>Permission Guards Enabled</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Add New
          </button>
        </div>
      </div>

      <PermissionGuard pageKey={key}>
        {key === 'users' ? <UsersPage onView={setSelectedId} /> : null}
        {key === 'user details' ? <UserDetailsPage id={selectedId} /> : null}
        {key === 'roles' ? <RolesPage /> : null}
        {key === 'permissions' ? <PermissionsPage /> : null}
        {key === 'role assignments' ? <RoleAssignmentsPage /> : null}
        {key === 'activity logs' ? <ActivityLogsPage /> : null}
        {key === 'audit trail' ? <AuditTrailPage /> : null}
        {key === 'system logs' ? <SystemLogsPage /> : null}
        {key === 'login history' ? <LoginHistoryPage /> : null}
        {MATCHED_KEYS.includes(key) ? null : <UsersPage onView={setSelectedId} />}
      </PermissionGuard>
    </div>
  )
}
