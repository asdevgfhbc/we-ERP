import { Bell, ChevronDown, Command, LayoutGrid, Menu, Moon, Search, Star, Sun, User } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ErpPage } from '@/app/pages'
import { notifications, pageTitleByPath } from '@/app/pages'
import { cn } from '@/lib/utils'
import { Input, SecondaryButton } from '@/components/ui/primitives'
import { useTheme } from '@/app/theme'

const NAV_SECTIONS = [
  'Dashboard',
  'Master Data',
  'Sales',
  'Purchasing',
  'Warehouse',
  'Logistics',
  'Finance',
  'HR',
  'Customer Service',
  'Reports',
  'Administration',
  'Settings',
] as const

function sectionFromModule(module: string) {
  if (module === 'Sales & Distribution') return 'Sales'
  if (module === 'Purchasing / Import') return 'Purchasing'
  if (module === 'Finance & Accounting') return 'Finance'
  if (module === 'Human Resources') return 'HR'
  if (module === 'Reports & Analytics') return 'Reports'
  if (module === 'User Management') return 'Administration'
  return module
}

function Sidebar({ pages, open, onClose }: { pages: ErpPage[]; open: boolean; onClose: () => void }) {
  const location = useLocation()
  const [expandedSection, setExpandedSection] = useState<string>('Dashboard')

  const grouped = useMemo(() => {
    const initial = Object.fromEntries(NAV_SECTIONS.map((section) => [section, [] as ErpPage[]]))
    return pages.reduce<Record<string, ErpPage[]>>((acc, page) => {
      const section = sectionFromModule(page.module)
      if (!acc[section]) {
        acc[section] = []
      }
      acc[section].push(page)
      return acc
    }, initial)
  }, [pages])

  const activeSection = useMemo(() => {
    const currentPage = pages.find((page) => page.path === location.pathname)
    return currentPage ? sectionFromModule(currentPage.module) : 'Dashboard'
  }, [location.pathname, pages])

  useEffect(() => {
    setExpandedSection(activeSection)
  }, [activeSection])

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
        {NAV_SECTIONS.map((section) => {
          const sectionPages = grouped[section] ?? []
          const isExpanded = expandedSection === section

          if (sectionPages.length === 0) return null

          return (
            <div key={section}>
              <button
                type="button"
                className={cn(
                  'mb-1 flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide transition',
                  activeSection === section
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
                onClick={() => setExpandedSection((current) => (current === section ? '' : section))}
              >
                {section}
                <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded ? 'rotate-0' : '-rotate-90')} />
              </button>

              {isExpanded ? (
                <div className="space-y-1 pl-2">
                  {sectionPages.map((page) => {
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
              ) : null}
            </div>
          )
        })}
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

function GlobalSearch({ pages }: { pages: ErpPage[] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const lower = query.toLowerCase().trim()
    if (!lower) return []
    return pages
      .filter((page) => page.title.toLowerCase().includes(lower) || page.module.toLowerCase().includes(lower))
      .slice(0, 8)
  }, [pages, query])

  const goTo = (path: string) => {
    navigate(path)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative hidden flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 md:flex">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        aria-label="Global Search"
        className="h-9 border-none p-0 shadow-none focus:ring-0"
        placeholder="Search pages, customers, invoices..."
        value={query}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 140)}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) {
            event.preventDefault()
            goTo(results[0].path)
          }
        }}
      />
      {open && query.trim() ? (
        <div className="absolute left-0 right-0 top-12 z-40 rounded-lg border border-border bg-popover p-2 shadow-xl">
          {results.length === 0 ? <p className="px-2 py-2 text-sm text-muted-foreground">No matching pages.</p> : null}
          {results.map((page) => (
            <button
              key={page.path}
              type="button"
              className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
              onMouseDown={() => goTo(page.path)}
            >
              <p className="font-medium">{page.title}</p>
              <p className="text-xs text-muted-foreground">{page.module}</p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(key)
      if (!saved) return []
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items))
  }, [items, key])

  return { items, setItems }
}

function SimpleMenu({
  title,
  trigger,
  children,
}: {
  title: string
  trigger: ReactNode
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-muted"
        aria-label={title}
      >
        {trigger}
      </button>
      {open ? <div className="absolute right-0 z-30 mt-2 w-72 rounded-lg border border-border bg-popover p-2 shadow-xl">{children}</div> : null}
    </div>
  )
}

function CommandPalette({ pages }: { pages: ErpPage[] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((v) => !v)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpenPalette = () => setOpen(true)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('open-command-palette', onOpenPalette)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('open-command-palette', onOpenPalette)
    }
  }, [])

  const results = useMemo(() => {
    const lower = query.toLowerCase().trim()
    if (!lower) return pages.slice(0, 14)
    return pages.filter((page) => page.title.toLowerCase().includes(lower) || page.module.toLowerCase().includes(lower)).slice(0, 14)
  }, [pages, query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-24" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-border px-3">
          <Command className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a page or module name..."
            className="h-10 border-none p-0 shadow-none focus:ring-0"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) {
                navigate(results[0].path)
                setOpen(false)
                setQuery('')
              }
            }}
          />
        </div>
        <div className="max-h-[50vh] space-y-1 overflow-y-auto">
          {results.map((page) => (
            <button
              key={page.path}
              type="button"
              className="block w-full rounded-lg px-3 py-2 text-left hover:bg-muted"
              onClick={() => {
                navigate(page.path)
                setOpen(false)
                setQuery('')
              }}
            >
              <p className="text-sm font-medium">{page.title}</p>
              <p className="text-xs text-muted-foreground">{page.module}</p>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Press Ctrl + K to toggle. Press Esc to close.</p>
      </div>
    </div>
  )
}

export function AppShell({ pages }: { pages: ErpPage[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { items: favorites, setItems: setFavorites } = useStoredList('we-erp-favorites')
  const { items: recents, setItems: setRecents } = useStoredList('we-erp-recents')

  useEffect(() => {
    const path = location.pathname
    setRecents((prev) => [path, ...prev.filter((item) => item !== path)].slice(0, 8))
  }, [location.pathname, setRecents])

  const currentPage = useMemo(() => pages.find((page) => page.path === location.pathname), [location.pathname, pages])
  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

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
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <GlobalSearch pages={pages} />
              <SecondaryButton className="gap-2" onClick={() => window.dispatchEvent(new Event('open-command-palette'))}>
                <LayoutGrid className="h-4 w-4" />
                Quick Actions
              </SecondaryButton>
              <SimpleMenu title="Favorites" trigger={<><Star className="h-4 w-4" />Favorites</>}>
                <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Favorites</p>
                {favorites.length === 0 ? <p className="px-2 py-2 text-sm text-muted-foreground">No favorites yet.</p> : null}
                {favorites.map((path) => {
                  const page = pages.find((item) => item.path === path)
                  if (!page) return null
                  return (
                    <button
                      key={path}
                      type="button"
                      className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => navigate(path)}
                    >
                      {page.title}
                    </button>
                  )
                })}
              </SimpleMenu>
              <SimpleMenu title="Recent Pages" trigger={<><LayoutGrid className="h-4 w-4" />Recent</>}>
                <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent Pages</p>
                {recents.length === 0 ? <p className="px-2 py-2 text-sm text-muted-foreground">No recent pages yet.</p> : null}
                {recents.map((path) => {
                  const page = pages.find((item) => item.path === path)
                  if (!page) return null
                  return (
                    <button
                      key={path}
                      type="button"
                      className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => navigate(path)}
                    >
                      {page.title}
                    </button>
                  )
                })}
              </SimpleMenu>
              <ThemeToggle />
              <NotificationMenu />
              <UserMenu />
            </div>
            {currentPage ? (
              <div className="mt-2 flex items-center justify-end">
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs',
                    favoriteSet.has(currentPage.path) ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : 'text-muted-foreground hover:bg-muted',
                  )}
                  onClick={() => {
                    setFavorites((prev) =>
                      prev.includes(currentPage.path)
                        ? prev.filter((path) => path !== currentPage.path)
                        : [currentPage.path, ...prev].slice(0, 20),
                    )
                  }}
                  aria-label="Toggle favorite"
                >
                  <Star className="h-3 w-3" />
                  {favoriteSet.has(currentPage.path) ? 'Favorited' : 'Add Favorite'}
                </button>
              </div>
            ) : null}
            <div className="mt-3">
              <Breadcrumbs />
            </div>
          </header>
          <main className="px-4 py-5 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      <CommandPalette pages={pages} />
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
