import {
  Bell,
  ChevronDown,
  Command,  Menu,
  Moon,
  Search,
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
        'relative border-t border-border/70 pt-2',
        mobileOpen ? 'block' : 'block',
      )}
    >
      <div className="flex items-center justify-center gap-1 overflow-visible whitespace-nowrap pb-2">
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
                onClick={() =>
                  setExpandedSection((current) =>
                    current === section ? null : section,
                  )
                }
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <SectionIcon className="h-4 w-4" />

                <span>{section}</span>

                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="absolute left-0 top-full z-[100] mt-2 w-[340px] rounded-2xl border border-border bg-background p-3 shadow-2xl">
                  <div className="mb-2 px-2 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section}
                    </p>
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto">
                    {sectionPages.map((page) => {
                      const active =
                        location.pathname === page.path

                      return (
                        <button
                          key={page.path}
                          type="button"
                          onClick={() => openPage(page.path)}
                          className={cn(
                            'block w-full rounded-xl px-3 py-3 text-left transition-colors',
                            active
                              ? 'bg-muted'
                              : 'hover:bg-muted',
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {page.title}
                              </p>

                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {page.subtitle}
                              </p>
                            </div>

                            <span className="text-muted-foreground">
                              ?
                            </span>
                          </div>
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
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 text-sm font-medium hover:bg-muted"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
          <User className="h-4 w-4" />
        </span>

        <span className="hidden lg:inline">
          ERP Admin
        </span>

        <ChevronDown className="h-4 w-4" />
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
   GLOBAL SEARCH
========================= */

function GlobalSearch({ pages }: { pages: ErpPage[] }) {  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const lower = query.toLowerCase().trim()

    if (!lower) return []

    return pages
      .filter(
        (page) =>
          page.title.toLowerCase().includes(lower) ||
          page.module.toLowerCase().includes(lower),
      )
      .slice(0, 8)
  }, [pages, query])

  const goTo = (path: string) => {
    navigate(path)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative hidden flex-1 md:flex">
      <div className="flex w-full items-center gap-2 rounded-full bg-muted/70 px-4">
        <Search className="h-4 w-4 text-muted-foreground" />

        <Input
          aria-label="Global Search"
          className="h-10 border-none bg-transparent p-0 shadow-none focus:ring-0"
          placeholder="Search anything..."
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() =>
            setTimeout(() => setOpen(false), 140)
          }
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
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-[80] rounded-2xl border border-border bg-background p-2 shadow-2xl">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No matching pages.
            </p>
          ) : null}

          {results.map((page) => (
            <button
              key={page.path}
              type="button"
              className="block w-full rounded-xl px-3 py-3 text-left hover:bg-muted"
              onMouseDown={() => goTo(page.path)}
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
      )}
    </div>
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
      <div className="min-w-0 pt-36 md:pt-36">
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">

          {/* MAIN NAVBAR */}
          <div className="relative flex w-full items-center justify-between gap-3">

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() =>
                setMobileNavOpen((value) => !value)
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              aria-label={
                mobileNavOpen
                  ? 'Close navigation'
                  : 'Open navigation'
              }
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

            {/* SEARCH */}
            <div className="ml-auto flex min-w-0 flex-1 justify-end lg:max-w-md">
              <GlobalSearch pages={pages} />
            </div>

            {/* THEME */}
            <ThemeToggle />

            {/* NOTIFICATIONS */}
            <NotificationMenu />

            {/* USER */}
            <UserMenu />
          </div>

          {/* MOBILE MODULE NAV */}
          <div className="w-full">
            <TopModuleNav
              pages={pages}
              mobileOpen={mobileNavOpen}
              onNavigate={() =>
                setMobileNavOpen(false)
              }
            />
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



























