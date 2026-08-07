import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { AppShell } from '@/components/shared/app-shell'
import { authPages, erpPages } from '@/app/pages'
import { GenericPage } from '@/pages/generic-page'
import { DashboardHomePage } from '@/pages/dashboard-home'
import { InvoicePrintPage } from '@/pages/invoice-print'
import { AuthPage } from '@/pages/auth-pages'
import { UserProfilePage } from '@/pages/user-profile'
import { ThemeProvider } from '@/app/theme'

function RoutedPage({ path }: { path: string }) {
  const page = erpPages.find((entry) => entry.path === path)

  if (!page) {
    return <Navigate to="/dashboard/home" replace />
  }

  if (page.title === 'Dashboard Home') {
    return <DashboardHomePage />
  }

  if (page.title === 'Print VAT Invoice') {
    return <InvoicePrintPage />
  }

  return <GenericPage page={page} />
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
        {authPages.map((page) => (
          <Route key={page.path} path={page.path} element={<AuthPage title={page.title} />} />
        ))}

        <Route path="/" element={<AppShell pages={erpPages} />}>
          <Route path="profile" element={<UserProfilePage />} />
          {erpPages.map((page) => (
            <Route key={page.path} path={page.path.slice(1)} element={<RoutedPage path={page.path} />} />
          ))}
        </Route>
      </Routes>
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
