import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import router from './router/Router'
import { OrbitProvider } from './context/OrbitProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <OrbitProvider>
    <RouterProvider router={router} />
  </OrbitProvider>
  
)
