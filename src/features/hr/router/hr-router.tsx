import { useMemo, useState } from 'react'
import type { PageDefinition } from '@/app/pages'
import { SecondaryButton } from '@/components/ui/primitives'
import { HrDashboardPage } from '@/features/hr/pages/hr-dashboard-page'
import { EmployeesPage } from '@/features/hr/pages/employees-page'
import { EmployeeDetailsPage } from '@/features/hr/pages/employee-details-page'
import { DepartmentsPage } from '@/features/hr/pages/departments-page'
import { DesignationsPage } from '@/features/hr/pages/designations-page'
import { AttendancePage } from '@/features/hr/pages/attendance-page'
import { LeavePage } from '@/features/hr/pages/leave-page'
import { PayrollPage } from '@/features/hr/pages/payroll-page'
import { RecruitmentPage } from '@/features/hr/pages/recruitment-page'
import { HolidayCalendarPage } from '@/features/hr/pages/holiday-calendar-page'
import { ModuleReportPage } from '@/components/shared/module-report-page'
import { ModuleSettingsPage } from '@/components/shared/module-settings-page'

function normalizeTitle(title: string) {
  return title.toLowerCase().trim()
}

const MATCHED_KEYS = [
  'hr dashboard',
  'employees',
  'employee details',
  'departments',
  'designations',
  'attendance',
  'leave',
  'payroll',
  'recruitment',
  'holiday calendar',
  'generate hr report',
  'hr settings',
]

export function HrRouter({ page }: { page: PageDefinition }) {
  const [selectedId, setSelectedId] = useState('EMP-0001')
  const key = useMemo(() => normalizeTitle(page.title), [page.title])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-sm text-muted-foreground">{page.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton>Export</SecondaryButton>
          <SecondaryButton>Print</SecondaryButton>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">
            Add New
          </button>
        </div>
      </div>

      {key === 'hr dashboard' ? <HrDashboardPage /> : null}
      {key === 'employees' ? <EmployeesPage onView={setSelectedId} /> : null}
      {key === 'employee details' ? <EmployeeDetailsPage id={selectedId} /> : null}
      {key === 'departments' ? <DepartmentsPage /> : null}
      {key === 'designations' ? <DesignationsPage /> : null}
      {key === 'attendance' ? <AttendancePage /> : null}
      {key === 'leave' ? <LeavePage /> : null}
      {key === 'payroll' ? <PayrollPage /> : null}
      {key === 'recruitment' ? <RecruitmentPage /> : null}
      {key === 'holiday calendar' ? <HolidayCalendarPage /> : null}
      {key === 'generate hr report' ? <ModuleReportPage moduleName="Human Resources" /> : null}
      {key === 'hr settings' ? <ModuleSettingsPage moduleName="Human Resources" /> : null}

      {MATCHED_KEYS.includes(key) ? null : <HrDashboardPage />}
    </div>
  )
}
