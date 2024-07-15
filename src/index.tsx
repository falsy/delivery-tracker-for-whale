import ReactDOM from "react-dom/client"
import Style from "./frameworks/components/styles/Style"
import Dashboard from "./frameworks/components/Dashboard"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Style />
      <Dashboard />
    </>
  )
}
root.render(<App />)
