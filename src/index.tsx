import * as React from "react"
import * as ReactDOM from "react-dom"
import Style from './components/Style'
import Dashboard from "./components/Dashboard"

const App = () => {
  return (
    <>
      <Style />
      <Dashboard />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("wrap"))