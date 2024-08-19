import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block">
              <main>
                  <Outlet />
              </main>
          </div>
      </div>
  )
}

export default App
