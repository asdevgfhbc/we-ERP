import {
  Bell,
  ChevronDown,
  Command,  Menu,
  Moon,
  Sun,
  User,
  Boxes,
  ShoppingCart,
  Truck,
  Warehouse,
  Shield,
  Home,
  DollarSign,
  Users,
} from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import type { ErpPage } from '@/app/pages'
import { notifications } from '@/app/pages'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/primitives'
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
  'Administration',
] as const

const SECTION_ICONS = {
  Dashboard: Home,
  'Master Data': Boxes,
  Sales: ShoppingCart,
  Purchasing: ShoppingCart,
  Warehouse: Warehouse,
  Logistics: Truck,
  Finance: DollarSign,
  HR: Users,
  Administration: Shield,
} as const

function sectionFromModule(module: string) {
  if (module === 'Sales & Distribution') return 'Sales'
  if (module === 'Purchasing / Import') return 'Purchasing'
  if (module === 'Finance & Accounting') return 'Finance'
  if (module === 'Human Resources') return 'HR'
  if (module === 'User Management') return 'Administration'
  return module
}

/* =========================
   STRIPE STYLE MODULE NAV
========================= */

function TopModuleNav({
  pages,
  mobileOpen,
  onNavigate,
}: {
  pages: ErpPage[]
  mobileOpen: boolean
  onNavigate: () => void
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const grouped = useMemo(() => {
    const result: Record<string, ErpPage[]> = {}

    pages.forEach((page) => {
      const section = sectionFromModule(page.module)

      if (!result[section]) {
        result[section] = []
      }

      result[section].push(page)
    })

    return result
  }, [pages])

  const openPage = (path: string) => {
    setExpandedSection(null)
    onNavigate()

    navigate(path)
  }

  return (
    <nav
      className={cn(
        'relative w-full shrink-0',
        mobileOpen ? 'block' : 'block',
      )}
    >
      <div className="flex w-full flex-nowrap items-center justify-center gap-0.5 overflow-visible whitespace-nowrap">
        {NAV_SECTIONS.map((section) => {
          const sectionPages = grouped[section] ?? []

          if (sectionPages.length === 0) {
            return null
          }

          const isOpen = expandedSection === section
          const SectionIcon = SECTION_ICONS[section]

          return (
            <div
              key={section}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={() => {
                  const firstPage = sectionPages[0]

                  if (section === 'Dashboard') {
                    setExpandedSection(null)
                    onNavigate()
                    navigate('/dashboard/home')
                    return
                  }

                  setExpandedSection(
                    isOpen ? null : section,
                  )

                  if (firstPage) {
                    navigate(firstPage.path)
                  }
                }}
                className={cn(
                  'inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition-all',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <SectionIcon className="h-4 w-4" />

                <span>{section}</span>

                {section !== 'Dashboard' && (
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 transition-transform',
                      isOpen && 'rotate-180',
                    )}
                  />
                )}
              </button>

              {isOpen && section !== 'Dashboard' && (
                <div className="absolute left-1/2 top-full z-[100] mt-3 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-border bg-background p-5 shadow-2xl">
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {section}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-x-5 gap-y-0">
                    {sectionPages.map((page) => {
                      const active =
                        location.pathname === page.path

                      return (
                        <button
                          key={page.path}
                          type="button"
                          onClick={() => openPage(page.path)}
                          className={cn(
                            'group min-w-0 rounded-lg px-3 py-2.5 text-left transition-colors',
                            active
                              ? 'bg-muted'
                              : 'hover:bg-muted',
                          )}
                        >
                          <p className="whitespace-nowrap text-sm font-medium text-foreground">
                            {page.title}
                          </p>

                          {page.subtitle && (
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {page.subtitle}
                            </p>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
/* =========================
   USER MENU
========================= */

function UserMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
          <User className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-[80] mt-2 w-56 rounded-2xl border border-border bg-background p-2 shadow-2xl">
          <Link
            to="/profile"
            className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            User Profile
          </Link>

          <Link
            to="/auth/change-password"
            className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            Change Password
          </Link>

          <div className="my-1 border-t border-border" />

          <Link
            to="/auth/login"
            className="block rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10"
            onClick={() => setOpen(false)}
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  )
}

/* =========================
   NOTIFICATIONS
========================= */

function NotificationMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
      >
        <Bell className="h-4 w-4" />

        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-[80] mt-2 w-80 rounded-2xl border border-border bg-background p-2 shadow-2xl">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Notifications
          </p>

          {notifications.map((notification) => (
            <div
              key={notification}
              className="rounded-xl px-3 py-3 text-sm hover:bg-muted"
            >
              {notification}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================
   THEME
========================= */

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

/* =========================
   COMMAND PALETTE
========================= */

function CommandPalette({ pages }: { pages: ErpPage[] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        setOpen((v) => !v)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const onOpenPalette = () => setOpen(true)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(
      'open-command-palette',
      onOpenPalette,
    )

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(
        'open-command-palette',
        onOpenPalette,
      )
    }
  }, [])

  const results = useMemo(() => {
    const lower = query.toLowerCase().trim()

    if (!lower) return pages.slice(0, 14)

    return pages
      .filter(
        (page) =>
          page.title.toLowerCase().includes(lower) ||
          page.module.toLowerCase().includes(lower),
      )
      .slice(0, 14)
  }, [pages, query])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-background p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2 rounded-2xl bg-muted px-4">
          <Command className="h-4 w-4 text-muted-foreground" />

          <Input
            autoFocus
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search modules and pages..."
            className="h-12 border-none bg-transparent p-0 shadow-none focus:ring-0"
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
              className="block w-full rounded-xl px-3 py-3 text-left hover:bg-muted"
              onClick={() => {
                navigate(page.path)
                setOpen(false)
                setQuery('')
              }}
            >
              <p className="text-sm font-medium">
                {page.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {page.module}
              </p>
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Press Ctrl + K to search.
        </p>
      </div>
    </div>
  )
}

/* =========================
   LOCAL STORAGE
========================= */

function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(key)

      if (!saved) return []

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed.filter(
            (item) => typeof item === 'string',
          )
        : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items))
  }, [items, key])

  return { items, setItems }
}

/* =========================
   APP SHELL
========================= */

export function AppShell({ pages }: { pages: ErpPage[] }) {
  const [mobileNavOpen, setMobileNavOpen] =
    useState(false)

  const location = useLocation()
  const { setItems: setRecents } =
    useStoredList('we-erp-recents')

  useEffect(() => {
    const path = location.pathname

    setRecents((prev) =>
      [path, ...prev.filter((item) => item !== path)].slice(
        0,
        8,
      ),
    )
  }, [location.pathname, setRecents])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-w-0 pt-20">
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">
  {/* MAIN NAVBAR */}
  <div className="flex w-full min-w-0 items-center gap-4">

    {/* MOBILE MENU */}
    <button
      type="button"
      onClick={() => setMobileNavOpen((value) => !value)}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border md:hidden"
      aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
    >
      <Menu className="h-4 w-4" />
    </button>

    {/* LOGO */}
    <Link
      to="/dashboard/home"
      className="flex shrink-0 items-center"
    >
      <img
        src="/WE-removebg-preview.png"
        alt="we-ERP"
        className="h-9 w-auto dark:brightness-0 dark:invert"
      />
    </Link>


    {/* MODULE NAV */}
    <div className="min-w-0 flex-1 overflow-visible">
      <TopModuleNav
        pages={pages}
        mobileOpen={mobileNavOpen}
        onNavigate={() => setMobileNavOpen(false)}
      />
    </div>

    {/* THEME */}
    <div className="shrink-0">
      <ThemeToggle />
    </div>

    {/* NOTIFICATIONS */}
    <div className="shrink-0">
      <NotificationMenu />
    </div>

    {/* USER */}
    <div className="shrink-0">
      <UserMenu />
    </div>

  </div>
</header>

        {/* PAGE CONTENT */}
        <main className="w-full px-4 py-5 md:px-8">
          <Outlet />
        </main>
      </div>

      <CommandPalette pages={pages} />

      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
    </div>
  )
}
























































