import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Dashboard from "@components/pages/Dashboard"
import ErrorBoundary from "@components/atoms/ErrorBoundary"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </StrictMode>
  )
}

root.render(<App />)
