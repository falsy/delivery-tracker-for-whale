import ReactDOM from "react-dom/client"
import DependencyProvider from "@providers/DependencyProvider"
import Style from "@components/styles/Style"
import Dashboard from "@pages/Dashboard"

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
