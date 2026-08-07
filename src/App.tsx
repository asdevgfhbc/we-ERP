import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { AppShell } from '@/components/shared/app-shell'
import { authPages, erpPages, getPageDefinition } from '@/app/pages'
import { ThemeProvider } from '@/app/theme'
import { LoadingState } from '@/components/shared/page-primitives'

const GenericPage = lazy(() => import('@/pages/generic-page').then((module) => ({ default: module.GenericPage })))
const SalesPage = lazy(() => import('@/pages/modules/sales-page'))
const PurchasingPage = lazy(() => import('@/pages/modules/purchasing-page'))
const WarehousePage = lazy(() => import('@/pages/modules/warehouse-page'))
const DashboardHomePage = lazy(() => import('@/pages/dashboard-home').then((module) => ({ default: module.DashboardHomePage })))
const InvoicePrintPage = lazy(() => import('@/pages/invoice-print').then((module) => ({ default: module.InvoicePrintPage })))
const AuthPage = lazy(() => import('@/pages/auth-pages').then((module) => ({ default: module.AuthPage })))
const UserProfilePage = lazy(() => import('@/pages/user-profile').then((module) => ({ default: module.UserProfilePage })))

function CurrentRoutePage() {
  const location = useLocation()
  const path = location.pathname.replace(/\/$/, '') || '/'

  if (path === '/dashboard' || path === '/dashboard/dashboard-home') {
    return <Navigate to="/dashboard/home" replace />
  }

  const page = getPageDefinition(path)

  if (!page) {
    return <Navigate to="/dashboard/home" replace />
  }

  if (page.title === 'Dashboard Home') {
    return <DashboardHomePage />
  }

  if (page.kind === 'print' && page.entity === 'invoice') {
    return <InvoicePrintPage />
  }

  if (page.module === 'Sales & Distribution') {
    return <SalesPage page={page} />
  }

  if (page.module === 'Purchasing / Import') {
    return <PurchasingPage page={page} />
  }

  if (page.module === 'Warehouse') {
    return <WarehousePage page={page} />
  }

  return <GenericPage page={page} />
}

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="p-6"><LoadingState /></div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="/dashboard/dashboard-home" element={<Navigate to="/dashboard/home" replace />} />
          {authPages.map((page) => (
            <Route key={page.path} path={page.path} element={<AuthPage title={page.title} />} />
          ))}

          <Route path="/" element={<AppShell pages={erpPages} />}>
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="*" element={<CurrentRoutePage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors closeButton />
      <button
        type="button"
        onClick={() => toast.success('Mock toast notification: action completed successfully')}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg"
      >
        Test Toast
      </button>
    </ThemeProvider>
  )
}
