import { Outlet } from "react-router-dom"
import './App.css'
function App() {

  return (
    <>
      <div className="custom-cursor">
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App