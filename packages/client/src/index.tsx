import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Dashboard from "@pages/Dashboard"
import "@styled-system/styles.css"

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
