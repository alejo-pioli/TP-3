import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/common.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Login'
import Details from './Details'
import Album from './Album'

const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/login", element:<Login />},
  {path:"/details/:id", element: <Details />},
  {path:"/details/:id/:album", element: <Album />},
])

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)
