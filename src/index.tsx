import React from 'react'
import ReactDOM from 'react-dom/client'
import Style from './components/Style'
import Dashboard from "./components/Dashboard"

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Style />
      <Dashboard />
    </>
  )
}
root.render(
  <App />
)