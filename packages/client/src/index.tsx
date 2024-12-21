import ReactDOM from "react-dom/client"
import "@styled-system/styles.css"
import DependencyProvider from "@providers/DependencyProvider"
import Dashboard from "@pages/Dashboard"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <DependencyProvider>
      <Dashboard />
    </DependencyProvider>
  )
}

root.render(<App />)
