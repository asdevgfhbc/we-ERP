import { Bell, ChevronDown, LayoutGrid, Menu, Moon, Search, Sun, User } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import type { ErpPage } from '@/app/pages'
import { pageTitleByPath } from '@/app/pages'
import { cn } from '@/lib/utils'
import { notifications } from '@/app/mock-data'
import { Input, SecondaryButton } from '@/components/ui/primitives'
import { useTheme } from '@/app/theme'

function Sidebar({ pages, open, onClose }: { pages: ErpPage[]; open: boolean; onClose: () => void }) {
  const location = useLocation()
  const grouped = useMemo(() => {
    return pages.reduce<Record<string, ErpPage[]>>((acc, page) => {
      if (!acc[page.module]) {
        acc[page.module] = []
      }
      acc[page.module].push(page)
      return acc
    }, {})
  }, [pages])

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-80 transform border-r border-border bg-sidebar px-3 py-4 transition md:static md:w-72 md:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="mb-4 flex items-center justify-between px-2">
        <div>
          <p className="font-display text-xl font-bold text-sidebar-foreground">we-ERP</p>
          <p className="text-xs text-muted-foreground">Enterprise Command Center</p>
        </div>
        <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden" type="button">
          <Menu className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[calc(100svh-130px)] space-y-4 overflow-y-auto pr-1">
        {Object.entries(grouped).map(([module, modulePages]) => (
          <div key={module}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{module}</p>
            <div className="space-y-1">
              {modulePages.map((page) => {
                const active = location.pathname === page.path
                return (
                  <Link
                    key={page.path}
                    to={page.path}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm transition',
                      active
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    )}
                    onClick={onClose}
                  >
                    {page.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link className="hover:text-foreground" to="/dashboard/home">
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const title = pageTitleByPath.get(path) ?? segment.replace(/-/g, ' ')
        const last = index === segments.length - 1
        return (
          <span key={path} className="inline-flex items-center gap-2">
            <span>/</span>
            {last ? <span className="text-foreground">{title}</span> : <Link to={path}>{title}</Link>}
          </span>
        )
      })}
    </div>
  )
}

function UserMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-muted"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-4 w-4" />
        </span>
        ERP Admin
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-52 rounded-lg border border-border bg-popover p-1 shadow-xl">
          <Link to="/profile" className="block rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setOpen(false)}>
            User Profile
          </Link>
          <Link to="/auth/change-password" className="block rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setOpen(false)}>
            Change Password
          </Link>
          <Link to="/auth/login" className="block rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10" onClick={() => setOpen(false)}>
            Sign Out
          </Link>
        </div>
      )}
    </div>
  )
}

function NotificationMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 rounded-lg border border-border bg-popover p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notifications</p>
          {notifications.map((notification) => (
            <div key={notification} className="rounded-md px-2 py-2 text-sm hover:bg-muted">
              {notification}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export function AppShell({ pages }: { pages: ErpPage[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="md:grid md:grid-cols-[18rem_1fr]">
        <Sidebar pages={pages} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="hidden flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 md:flex">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input className="h-9 border-none p-0 shadow-none focus:ring-0" placeholder="Search customers, invoices, shipments..." />
              </div>
              <SecondaryButton className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Quick Actions
              </SecondaryButton>
              <ThemeToggle />
              <NotificationMenu />
              <UserMenu />
            </div>
            <div className="mt-3">
              <Breadcrumbs />
            </div>
          </header>
          <main className="px-4 py-5 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
