import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "8px",
            margin: "20px",
            fontFamily: "monospace"
          }}
        >
          <h2 style={{ color: "#c33", marginBottom: "16px" }}>
            오류가 발생했습니다
          </h2>
          <details style={{ marginBottom: "16px" }}>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              오류 세부사항
            </summary>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
                overflow: "auto",
                marginTop: "8px"
              }}
            >
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          {this.state.errorInfo && (
            <details>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                스택 트레이스
              </summary>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "4px",
                  overflow: "auto",
                  marginTop: "8px",
                  fontSize: "12px"
                }}
              >
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
