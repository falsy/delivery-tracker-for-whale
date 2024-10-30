import ReactDOM from "react-dom/client"
import Style from "@components/styles/Style"
import DependencyProvider from "@di/DependencyProvider"
import Dashboard from "@components/Dashboard"

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
