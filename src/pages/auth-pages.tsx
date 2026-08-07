import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, Input, SecondaryButton } from '@/components/ui/primitives'

const authDescriptions: Record<string, string> = {
  Login: 'Securely access the ERP platform and monitor enterprise operations.',
  'Forgot Password': 'Submit your registered email to receive a password reset link.',
  'Reset Password': 'Create a new strong password for your ERP account.',
  'Change Password': 'Update your account password and maintain account security.',
}

export function AuthPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-teal-50 to-sky-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-[1.1fr_1fr]">
          <div className="hidden bg-[radial-gradient(circle_at_20%_20%,rgba(13,148,136,.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,.25),transparent_40%)] p-10 lg:block">
            <h1 className="font-display text-4xl font-bold tracking-tight">we-ERP</h1>
            <p className="mt-4 max-w-sm text-muted-foreground">A modern, responsive ERP user experience for finance, operations, logistics, HR, and reporting teams.</p>
          </div>
          <Card className="rounded-none border-0 shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-2xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{authDescriptions[title]}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input type="email" placeholder="Email Address" />
              {(title === 'Login' || title === 'Reset Password' || title === 'Change Password') && (
                <Input type="password" placeholder="Password" />
              )}
              {(title === 'Reset Password' || title === 'Change Password') && (
                <Input type="password" placeholder="Confirm Password" />
              )}
              <button className="h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground" type="button">
                {title}
              </button>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link className="text-primary hover:underline" to="/auth/login">Login</Link>
                <Link className="text-primary hover:underline" to="/auth/forgot-password">Forgot Password</Link>
                <Link className="text-primary hover:underline" to="/dashboard/home">Continue to App</Link>
              </div>
              <SecondaryButton className="w-full">Two-Factor Authentication (Mock)</SecondaryButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
