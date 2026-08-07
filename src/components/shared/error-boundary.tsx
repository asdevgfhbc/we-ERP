import { Component, type ErrorInfo, type ReactNode } from 'react'
import { SecondaryButton } from '@/components/ui/primitives'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary captured an error', { error, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-6 rounded-2xl border border-border bg-card p-6 text-card-foreground">
          <h2 className="font-display text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground">An unexpected UI error occurred. Reload the page to continue.</p>
          {this.state.message ? <p className="mt-2 text-xs text-muted-foreground">Error: {this.state.message}</p> : null}
          <div className="mt-4">
            <SecondaryButton onClick={() => window.location.reload()}>Reload</SecondaryButton>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
