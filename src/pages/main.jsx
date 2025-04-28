import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Login'

const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/login", element:<Login />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
