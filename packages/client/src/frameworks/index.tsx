import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Dashboard from "@components/pages/Dashboard"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <StrictMode>
      <Dashboard />
    </StrictMode>
  )
}

root.render(<App />)
