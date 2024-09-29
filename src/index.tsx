import ReactDOM from "react-dom/client"
import Style from "./frameworks/components/styles/Style"
import DependencyProvider from "./frameworks/di/DependencyProvider"
import Dashboard from "./frameworks/components/Dashboard"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Style />
      <DependencyProvider>
        <Dashboard />
      </DependencyProvider>
    </>
  )
}
root.render(<App />)
